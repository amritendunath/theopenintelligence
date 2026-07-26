export type InsightCategory =
  | 'Case Studies'
  | 'Technical Guides'
  | 'Industry Insights'
  | 'Research & Learning';

export type InsightSection = {
  heading: string;
  paragraphs: string[];
};

export type InsightPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  date: string;
  updatedAt?: string;
  readTime: string;
  featured?: boolean;
  author?: string;
  reviewedBy?: string;
  clientType?: string;
  teamSize?: string;
  timeline?: string;
  highlights?: string[];
  sections: InsightSection[];
};

export const insightPosts: InsightPost[] = [
  {
    slug: 'cut-support-resolution-time-using-multi-agent-rag',
    title: 'How We Cut Support Resolution Time by 27% Using a Multi-Agent RAG System',
    excerpt:
      'Learn how we built a production RAG pipeline for a B2B SaaS company that reduced repeat tickets by 22% and improved agent satisfaction from 6.8 to 8.4/10.',
    category: 'Case Studies',
    date: 'April 2026',
    updatedAt: 'April 24, 2026',
    readTime: '8 min read',
    author: 'OpenIntelligence Delivery Team',
    reviewedBy: 'AI Solutions Architect',
    clientType: 'B2B SaaS (Series B)',
    teamSize: '50 support agents',
    timeline: '4-month implementation',
    highlights: [
      '27% higher first-contact resolution',
      '22% fewer repeat tickets',
      'Agent satisfaction 6.8 to 8.4/10',
    ],
    sections: [
      {
        heading: 'The Problem: Knowledge Scattered, Support Suffering',
        paragraphs: [
          'When a Series B SaaS company reached out, their support team was struggling with scale. They had 50 agents handling thousands of tickets monthly, but operational friction was growing.',
          'First response times averaged over 45 minutes for routine questions. About 22% of tickets were repeat issues caused by inconsistent answers. Agents spent around 30% of their time searching across Notion, Confluence, and internal wikis. Morale declined because agents felt they could not provide fast, accurate help.',
          'The root cause was fragmented knowledge across systems, with no reliable way to surface the right information at the right time.',
          '"We had the documentation, but finding it was like searching through a library with no card catalog."',
        ],
      },
      {
        heading: "Why Traditional Solutions Weren't Working",
        paragraphs: [
          'The team had already tried knowledge base consolidation, basic keyword search tools, manual training, and a FAQ chatbot. None solved the core workflow problem.',
          'Knowledge base consolidation stalled due to organizational debt and migration resistance. Keyword search missed intent and context. Manual training still required 6+ weeks for new hires to become productive. The FAQ bot handled only a small share of queries and frustrated customers.',
          'They needed a solution that could work across existing tools, understand context and intent, surface relevant information instantly, learn from successful resolutions, and integrate directly into support operations.',
        ],
      },
      {
        heading: 'Our Solution: Multi-Agent RAG Architecture',
        paragraphs: [
          'We designed a system with three specialized AI agents working together.',
          'Retrieval Agent: Embedded and indexed content from Notion, Confluence, Slack, and historical tickets. It used semantic search (not just keywords), retrieved the most relevant documents with confidence scores, and supported role-based retrieval for different support levels.',
          'Synthesis Agent: Processed retrieved context into actionable answers, cited sources for verification, adapted tone by urgency and customer tier, and used historical ticket patterns to suggest proven responses.',
          'Escalation Agent: Monitored confidence and complexity, flagged low-confidence answers for human review, routed tickets to the right specialist, and improved routing over time through a learning loop.',
        ],
      },
      {
        heading: 'The Technical Stack',
        paragraphs: [
          'Vector database: Pinecone (100M+ embeddings, sub-200ms retrieval).',
          'Embedding model: OpenAI text-embedding-3-large.',
          'Orchestration: LangChain plus a custom orchestration layer.',
          'Primary LLM: Claude Sonnet 4 for synthesis and reasoning.',
          'Integrations: Zendesk API, Slack webhooks, and custom middleware.',
          'Monitoring: Custom dashboards for confidence, retrieval accuracy, and escalation rates.',
        ],
      },
      {
        heading: 'Implementation: 4-Month Delivery',
        paragraphs: [
          'Month 1 (Discovery and Data): Audited 10,000+ tickets, mapped knowledge sources, aligned stakeholders on success metrics, and built continuous ingestion pipelines.',
          'Month 2 (MVP and Testing): Built the core RAG pipeline on 20,000 documents and tested against 100 historical tickets. Initial accuracy reached 78% against an 85% target, exposing edge cases.',
          'Month 3 (Refinement and Pilot): Added multi-agent orchestration and escalation logic, improved retrieval with query expansion and reranking, and piloted with 5 agents. Accuracy improved to 89%.',
          'Month 4 (Rollout and Optimization): Rolled out to all 50 agents over two weeks, monitored daily, tuned edge cases quickly, and implemented feedback loops and change management.',
        ],
      },
      {
        heading: 'Results: Measurable Impact',
        paragraphs: [
          'Efficiency: 27% increase in first-contact resolution (71% to 90%), 22% reduction in repeat tickets, 40% faster first-response time (45 minutes to 27 minutes), and about 15 hours saved per agent per week.',
          'Quality: Agent satisfaction rose from 6.8 to 8.4/10, customer satisfaction increased by 12%, 89% of AI-suggested answers were rated helpful or very helpful, and new-hire ramp time dropped from 6 weeks to 3 weeks.',
          'Business: ROI landed in 5 months, 3 additional support hires were avoided (about $240K/year), and backlog dropped by 60%.',
        ],
      },
      {
        heading: 'Key Lessons Learned',
        paragraphs: [
          'Do not force migration when integration can deliver faster value.',
          'Confidence scoring is mandatory in production workflows.',
          'The escalation agent is what makes AI safe and reliable in real operations.',
          'Agent buy-in requires early involvement in testing and feedback loops.',
          'Monitoring and iteration are at least half of the implementation effort.',
        ],
      },
      {
        heading: "What We'd Do Differently Next Time",
        paragraphs: [
          'Start with a smaller high-impact document corpus instead of indexing everything on day one.',
          'Implement user feedback loops (thumbs up/down) from the first month.',
          'Invest earlier in change management and operator onboarding during rollout.',
        ],
      },
      {
        heading: 'Architecture (Simplified)',
        paragraphs: [
          `Customer Ticket Arrives
         ↓
   Retrieval Agent
   (Searches across knowledge bases)
         ↓
   Synthesis Agent
   (Generates contextual answer)
         ↓
   Escalation Agent
   (Checks confidence score)
         ↓
   High Confidence → AI Response + Human Review
   Low Confidence → Route to Human Expert`,
        ],
      },
      {
        heading: 'Ready to Transform Your Support Operations?',
        paragraphs: [
          'This was a 4-month implementation with measurable ROI in 5 months. If your support team is facing fragmented knowledge, response delays, or scale constraints, we can help.',
          'Book a free discovery call and we will audit your support workflow and provide a custom implementation roadmap.',
          'About OpenIntelligence: We build production-grade AI agent systems that coordinate across your existing tools and deliver measurable business outcomes.',
        ],
      },
    ],
  },
  {
    slug: 'logistics-multi-agent-routing-case-study',
    title: 'How a logistics team reduced SLA misses with multi-agent routing',
    excerpt: 'A practical deployment pattern for dispatch triage, enrichment, and automated handoff.',
    category: 'Case Studies',
    date: 'March 2026',
    updatedAt: 'March 12, 2026',
    readTime: '6 min read',
    featured: true,
    author: 'OpenIntelligence Operations Team',
    reviewedBy: 'Lead Automation Engineer',
    clientType: 'Regional logistics carrier',
    teamSize: '350+ employees',
    timeline: '10-week implementation',
    sections: [
      {
        heading: 'Context',
        paragraphs: [
          'The operations team handled dispatch through inboxes, chat threads, and spreadsheets. This caused delayed handoffs and inconsistent prioritization.',
          'The goal was to reduce SLA breaches without increasing headcount.',
        ],
      },
      {
        heading: 'Implementation',
        paragraphs: [
          'We built a multi-agent flow: intake triage agent, context enrichment agent, and routing agent connected to the dispatch queue.',
          'The system used rules plus retrieval context from SOP documents so routing decisions stayed aligned with operations policy.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'The team achieved 43% faster dispatch turnaround and reduced SLA breaches by 31% in the first quarter.',
        ],
      },
    ],
  },
  {
    slug: 'enterprise-rag-pipeline-patterns',
    title: 'Designing reliable RAG pipelines for enterprise workflows',
    excerpt: 'Reference architecture for retrieval quality, relevance checks, and escalation handling.',
    category: 'Technical Guides',
    date: 'February 2026',
    updatedAt: 'February 18, 2026',
    readTime: '8 min read',
    author: 'OpenIntelligence Engineering',
    reviewedBy: 'Principal AI Engineer',
    sections: [
      {
        heading: 'Why most RAG pilots fail',
        paragraphs: [
          'Many teams treat retrieval as a one-time setup and skip evaluation loops. Quality drops quickly once data sources and usage patterns change.',
        ],
      },
      {
        heading: 'Core architecture',
        paragraphs: [
          'A resilient pattern includes ingestion checks, semantic chunking, retrieval scoring, answer grounding, and escalation logic when confidence is low.',
        ],
      },
      {
        heading: 'Production guardrails',
        paragraphs: [
          'Track retrieval precision, unresolved intent rate, and human override frequency to continuously tune relevance.',
        ],
      },
    ],
  },
  {
    slug: 'ma-signals-ai-automation-demand',
    title: 'What M&A signals reveal about AI automation demand',
    excerpt: 'How to identify real adoption moments from market events and operational pressure.',
    category: 'Industry Insights',
    date: 'February 2026',
    updatedAt: 'February 10, 2026',
    readTime: '5 min read',
    author: 'OpenIntelligence Strategy Team',
    reviewedBy: 'Industry Research Lead',
    sections: [
      {
        heading: 'Signal interpretation',
        paragraphs: [
          'Merger events often create process overlap and integration pressure. This is when workflow automation demand increases sharply.',
        ],
      },
      {
        heading: 'Where to focus first',
        paragraphs: [
          'Prioritize repetitive high-volume workflows in operations, support, and reporting where ROI can be measured in weeks.',
        ],
      },
    ],
  },
  {
    slug: 'agent-evaluation-frameworks',
    title: 'Agent evaluation frameworks: from demos to production confidence',
    excerpt: 'Metrics and review loops that keep output quality stable at scale.',
    category: 'Research & Learning',
    date: 'January 2026',
    updatedAt: 'January 28, 2026',
    readTime: '7 min read',
    author: 'OpenIntelligence Research',
    reviewedBy: 'Head of AI Research',
    sections: [
      {
        heading: 'From anecdotal to measurable',
        paragraphs: [
          'Demo success does not equal production reliability. Define pass/fail criteria tied to business outcomes before rollout.',
        ],
      },
      {
        heading: 'Evaluation model',
        paragraphs: [
          'Use a blended scorecard: task accuracy, policy compliance, latency, and escalation quality under realistic scenarios.',
        ],
      },
    ],
  },
  {
    slug: 'support-rag-first-response-case-study',
    title: 'Case study: support teams improving first response with RAG',
    excerpt: 'How role-aware retrieval improved consistency and reduced repeat tickets.',
    category: 'Case Studies',
    date: 'January 2026',
    updatedAt: 'January 22, 2026',
    readTime: '6 min read',
    author: 'OpenIntelligence Delivery Team',
    reviewedBy: 'Support Automation Specialist',
    clientType: 'B2B SaaS support organization',
    teamSize: '120+ employees',
    timeline: '8-week implementation',
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Support agents spent too much time searching scattered docs before responding, which increased first-response latency.',
        ],
      },
      {
        heading: 'Solution',
        paragraphs: [
          'We implemented role-aware retrieval and escalation agents inside the support workspace with clear confidence thresholds.',
        ],
      },
      {
        heading: 'Result',
        paragraphs: [
          'The team improved first-response speed by 52% and reduced repeat tickets by 22%.',
        ],
      },
    ],
  },
  {
    slug: 'integration-checklist-multi-agent-systems',
    title: 'Integration checklist for multi-agent systems',
    excerpt: 'Core technical checks before connecting agents to CRM, docs, and ticketing stacks.',
    category: 'Technical Guides',
    date: 'January 2026',
    updatedAt: 'January 15, 2026',
    readTime: '4 min read',
    author: 'OpenIntelligence Engineering',
    reviewedBy: 'Platform Architect',
    sections: [
      {
        heading: 'Checklist highlights',
        paragraphs: [
          'Verify API stability, auth boundaries, data freshness, and fallback paths before enabling autonomous actions.',
          'Explicitly map who can trigger actions and what must require human approval.',
        ],
      },
    ],
  },
];
