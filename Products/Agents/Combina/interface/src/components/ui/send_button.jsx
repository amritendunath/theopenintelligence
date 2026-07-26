import { Square, ArrowUp } from 'lucide-react';

const SendButton = ({ isStarting, input, startSSE, stopSSE }) => {

    const StartSSEButton = () => {
        return (
            <div className=" flex items-center gap-2 ml-auto ">
                <button
                    onClick={startSSE}
                    className={`mt-1 w-8 h-8 flex items-center justify-center rounded-full focus:outline-none transition-colors border border-[#363c4d] ${input
                        ? 'bg-white text-black'
                        : 'bg-[#141820] text-white '
                        }`}
                >
                    <ArrowUp className="w-4 h-4" strokeWidth={2.4} />
                </button>
            </div>
        )
    }
    const StopSSEButton = () => {
        return (
            <div className=" flex items-center gap-2 ml-auto ">
                <button
                    className={`mt-1 w-8 h-8 flex items-center justify-center rounded-full focus:outline-none transition-colors bg-white text-black`}
                    onClick={stopSSE}
                >
                    <Square className="w-4 h-4" strokeWidth={2.4} />
                </button>
            </div>
        )
    }
    return (
        <div className="flex items-center gap-2 ml-auto">
            {isStarting ?
                <StopSSEButton />
                :
                <StartSSEButton />
            }
        </div>
    )
}

export default SendButton
