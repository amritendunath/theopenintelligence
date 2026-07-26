import os
from langgraph.graph import StateGraph
from agents.AgentState import State
from agents.base import Assistant
from langgraph.graph import START, END
from agents.agents import get_runnable
from models.agents import CompleteOrEscalate

from utils.prompts import (
    supervisor_agent_prompt,
    medical_quick_agent_prompt,
    medical_think_agent_prompt,
    availability_agent_prompt,
    booking_agent_prompt,
    hospital_agent_prompt
)
from models.agents import (
    ToAppointmentBookingAssistant,
    ToGetInfo,
    ToPrimaryBookingAssistant,
    ToMedicalAssistant,
    ToHospitalSearchAssistant,
)

from tools.tools import (
    set_appointment,
    reschedule_appointment,
    cancel_appointment,
    check_availability_by_specialization,
    check_availability_by_doctor,
    find_nearby_hospital,
    get_doctor_info_by_hospital_name,
    vector_tool,
    web_search_tool,
    medical_image_search_tool,
)
from langgraph.prebuilt import tools_condition
from utils.helper import (
    create_entry_node,
    create_tool_node_with_fallback,
    pop_dialog_state,
    RouteUpdater,
    route_to_workflow,
    route_primary_assistant,
)
# from utils.config import get_settings
# Azure_Creds = get_settings()

# os.environ["LANGCHAIN_TRACING_V2"] = "true"
# os.environ["LANGCHAIN_ENDPOINT"] = Azure_Creds.LANGCHAIN_ENDPOINT
# os.environ["LANGCHAIN_API_KEY"] = Azure_Creds.LANGCHAIN_API_KEY
# os.environ["LANGCHAIN_PROJECT"] = Azure_Creds.LANGCHAIN_PROJECT

# Config = get_settings()

info_tools = [
    check_availability_by_specialization,
    check_availability_by_doctor,
    get_doctor_info_by_hospital_name,
    CompleteOrEscalate

]

booking_tools = [
    set_appointment,
    reschedule_appointment,
    cancel_appointment,
    CompleteOrEscalate
]


primary_tools = [
    ToHospitalSearchAssistant,
    ToMedicalAssistant,  # Add this first in the list
    ToAppointmentBookingAssistant,
    ToGetInfo,
    ToPrimaryBookingAssistant,
    CompleteOrEscalate,
]

medical_tools=[
    vector_tool,
    CompleteOrEscalate
]


hospital_tools = [
    find_nearby_hospital,
    CompleteOrEscalate
]

# Quick mode toolsets can use web research when the agent decides it is necessary.
quick_info_tools = [
    check_availability_by_specialization,
    check_availability_by_doctor,
    get_doctor_info_by_hospital_name,
    web_search_tool,
    CompleteOrEscalate,
]

quick_medical_tools = [
    web_search_tool,
    medical_image_search_tool,
    CompleteOrEscalate,
]

quick_hospital_tools = [
    find_nearby_hospital,
    web_search_tool,
    CompleteOrEscalate,
]





def build_graph_quick(llm, memory) -> StateGraph:
    """
    Builds and returns a state graph for the multi-agent conversation system.

    Returns:
        StateGraph: Compiled state graph with all nodes and edges
    """
    primary_runnable = get_runnable(
        llm=llm, tools=primary_tools, agent_prompt=supervisor_agent_prompt
    )
    medical_runnable = get_runnable(
        llm=llm, tools= quick_medical_tools, agent_prompt=medical_quick_agent_prompt,
    )
    info_runnable = get_runnable(
        llm=llm, tools= quick_info_tools, agent_prompt=availability_agent_prompt
    )
    booking_runnable = get_runnable(
        llm=llm, tools= booking_tools, agent_prompt=booking_agent_prompt,
    )
    hospital_runnable = get_runnable(
        llm=llm, tools= quick_hospital_tools, agent_prompt=hospital_agent_prompt,
    )

    builder = StateGraph(State)

    # Section 1: Core Assistant Nodes
    builder.add_node("primary_assistant", Assistant(primary_runnable))
    builder.add_node("medical_info", Assistant(medical_runnable))
    builder.add_node("get_info", Assistant(info_runnable))
    builder.add_node("appointment_info", Assistant(booking_runnable))
    builder.add_node("hospital_info", Assistant(hospital_runnable))

    # Section 2: Entry Point Nodes
    builder.add_node(
        "enter_medical_info", create_entry_node("Medical Assistant", "medical_info")
    )
    builder.add_node(
        "enter_hospital_info", create_entry_node("Hospital Assistant", "hospital_info")
    )
    builder.add_node(
        "enter_get_info", create_entry_node("Get Information Assistant", "get_info")
    )
    builder.add_node(
        "enter_appointment_info", create_entry_node("Appointment Assistant", "appointment_info"),
    )

    # Section 3: Tool Management Nodes
    builder.add_node(
        "update_medical_info", create_tool_node_with_fallback(quick_medical_tools)
    )
    builder.add_node(
        "update_info_tools", create_tool_node_with_fallback(quick_info_tools))
    builder.add_node(
        "update_appointment_tools", create_tool_node_with_fallback(booking_tools)
    )
    builder.add_node(
        "update_hospital_tools", create_tool_node_with_fallback(quick_hospital_tools)
    )
    builder.add_node("leave_skill", pop_dialog_state)

    # Section 4: Primary Flow Edges
    builder.add_conditional_edges(START, route_to_workflow)
    builder.add_conditional_edges(
        "primary_assistant",
        route_primary_assistant,
        [
            "enter_appointment_info",
            "enter_get_info",
            "enter_medical_info",
            "enter_hospital_info",
            END,
        ],
    )

    # Section 5: Information Flow Edges
    builder.add_edge("enter_get_info", "get_info")
    builder.add_edge("update_info_tools", "get_info")
    builder.add_conditional_edges(
        "get_info",
        RouteUpdater(quick_info_tools, "update_info_tools").route_update_info,
        ["update_info_tools", "leave_skill", END],
    )

    # Section 6: Appointment Flow Edges
    builder.add_edge("enter_appointment_info", "appointment_info")
    builder.add_edge("update_appointment_tools", "appointment_info")
    builder.add_conditional_edges(
        "appointment_info",
        RouteUpdater(booking_tools, "update_appointment_tools").route_update_info,
        ["update_appointment_tools", "leave_skill", END],
    )

    # Section 7: Medical Flow Edges
    builder.add_edge("enter_medical_info", "medical_info")
    builder.add_edge("update_medical_info", "medical_info")
    builder.add_conditional_edges(
        "medical_info",
        RouteUpdater(
            # [ToAppointmentBookingAssistant, CompleteOrEscalate], None
            quick_medical_tools, "update_medical_info"
        ).route_update_info,
        ["update_medical_info", "leave_skill", END],
    )
    # Section 8: Hospital Flow Edges
    builder.add_edge("enter_hospital_info", "hospital_info")
    builder.add_edge("update_hospital_tools", "hospital_info")
    builder.add_conditional_edges(
        "hospital_info",
        RouteUpdater(quick_hospital_tools, "update_hospital_tools").route_update_info,
        ["update_hospital_tools", "leave_skill", END],
    )

    # Section 8: Return Path Edges
    builder.add_edge("leave_skill", "primary_assistant")

    # Compile and Return Graph
    graph = builder.compile(checkpointer=memory)
    return graph


def build_graph_think(llm, memory) -> StateGraph:
    """
    Builds and returns a state graph for the multi-agent conversation system.

    Returns:
        StateGraph: Compiled state graph with all nodes and edges
    """
    primary_runnable = get_runnable(llm=llm,
                                    tools=primary_tools,
                                    agent_prompt=supervisor_agent_prompt)
    medical_runnable = get_runnable(
        llm=llm,
        tools=medical_tools,
        agent_prompt=medical_think_agent_prompt,
    )
    info_runnable = get_runnable(llm=llm,
                                 tools=info_tools,
                                 agent_prompt=availability_agent_prompt)
    booking_runnable = get_runnable(
        llm=llm,
        tools=booking_tools,
        agent_prompt=booking_agent_prompt,
    )
    hospital_runnable = get_runnable(
        llm=llm,
        tools=hospital_tools,
        agent_prompt=hospital_agent_prompt,
    )

    builder = StateGraph(State)

    # Section 1: Core Assistant Nodes
    builder.add_node("primary_assistant", Assistant(primary_runnable))
    builder.add_node("medical_info", Assistant(medical_runnable))
    builder.add_node("get_info", Assistant(info_runnable))
    builder.add_node("appointment_info", Assistant(booking_runnable))
    builder.add_node("hospital_info", Assistant(hospital_runnable))

    # Section 2: Entry Point Nodes
    builder.add_node("enter_medical_info",
                     create_entry_node("Medical Assistant", "medical_info"))
    builder.add_node("enter_hospital_info",
                     create_entry_node("Hospital Assistant", "hospital_info"))
    builder.add_node(
        "enter_get_info",
        create_entry_node("Get Information Assistant", "get_info"))
    builder.add_node(
        "enter_appointment_info",
        create_entry_node("Appointment Assistant", "appointment_info"),
    )

    # Section 3: Tool Management Nodes
    builder.add_node("update_medical_info",
                     create_tool_node_with_fallback(medical_tools))
    builder.add_node("update_info_tools",
                     create_tool_node_with_fallback(info_tools))
    builder.add_node("update_appointment_tools",
                     create_tool_node_with_fallback(booking_tools))
    builder.add_node("update_hospital_tools",
                     create_tool_node_with_fallback(hospital_tools))
    builder.add_node("leave_skill", pop_dialog_state)

    # Section 4: Primary Flow Edges
    builder.add_conditional_edges(START, route_to_workflow)
    builder.add_conditional_edges(
        "primary_assistant",
        route_primary_assistant,
        [
            "enter_appointment_info",
            "enter_get_info",
            "enter_medical_info",
            "enter_hospital_info",
            END,
        ],
    )

    # Section 5: Information Flow Edges
    builder.add_edge("enter_get_info", "get_info")
    builder.add_edge("update_info_tools", "get_info")
    builder.add_conditional_edges(
        "get_info",
        RouteUpdater(info_tools, "update_info_tools").route_update_info,
        ["update_info_tools", "leave_skill", END],
    )

    # Section 6: Appointment Flow Edges
    builder.add_edge("enter_appointment_info", "appointment_info")
    builder.add_edge("update_appointment_tools", "appointment_info")
    builder.add_conditional_edges(
        "appointment_info",
        RouteUpdater(booking_tools,
                     "update_appointment_tools").route_update_info,
        ["update_appointment_tools", "leave_skill", END],
    )

    # Section 7: Medical Flow Edges
    builder.add_edge("enter_medical_info", "medical_info")
    builder.add_edge("update_medical_info", "medical_info")
    builder.add_conditional_edges(
        "medical_info",
        RouteUpdater(
            # [ToAppointmentBookingAssistant, CompleteOrEscalate], None
            medical_tools,
            "update_medical_info").route_update_info,
        ["update_medical_info", "leave_skill", END],
    )
    # Section 8: Hospital Flow Edges
    builder.add_edge("enter_hospital_info", "hospital_info")
    builder.add_edge("update_hospital_tools", "hospital_info")
    builder.add_conditional_edges(
        "hospital_info",
        RouteUpdater(hospital_tools,
                     "update_hospital_tools").route_update_info,
        ["update_hospital_tools", "leave_skill", END],
    )

    # Section 8: Return Path Edges
    builder.add_edge("leave_skill", "primary_assistant")

    # Compile and Return Graph
    graph = builder.compile(checkpointer=memory)
    return graph


def build_graph_web(llm, memory) -> StateGraph:
    """Builds a graph for web search."""
    web_tools = [web_search_tool]

    prompt = (
        "You are a web-research assistant. Use the available web search tool, then answer with inline citations.\n"
        "Rules:\n"
        "1) Every factual or numeric sentence must end with an inline source link in markdown format: [source](URL).\n"
        "2) If multiple claims are in one sentence, include all relevant links.\n"
        "3) Do not invent URLs. Only cite links that came from tool results.\n"
        "4) If a claim is not verifiable from retrieved sources, explicitly mark it as unverified.\n"
        "5) For requests asking for current data, chart, graph, trend, or statistics: provide concrete numeric values from recent sources.\n"
        "6) If chart rendering is not possible, return a markdown table with columns suitable for charting (e.g., Date, Metric, Value, Source).\n"
        "7) Keep the answer concise and structured with bullets when helpful."
    )
        
    web_runnable = get_runnable(llm=llm, tools=web_tools, agent_prompt=prompt)
        
    builder = StateGraph(State)
    builder.add_node("primary_assistant", Assistant(web_runnable))
    builder.add_node("tools", create_tool_node_with_fallback(web_tools))
        
    builder.add_edge(START, "primary_assistant")
    builder.add_conditional_edges(
        "primary_assistant",
        tools_condition,
    )
    builder.add_edge("tools", "primary_assistant")
        
    return builder.compile(checkpointer=memory)
