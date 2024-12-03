'use client'

const LargeModal = ({ isOpen, setIsOpen, onClose, title, description, choice, cancle, children }) => {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black/50 z-20"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-96 h-auto max-h-[80vh] bg-white border rounded-xl px-8 py-6"
                onClick={(e) => e.stopPropagation()} // 클릭이 모달 바깥쪽으로 전달되지 않도록 함
            >
                <div className="font-bold text-lg">{title}</div>
                <div className="mt-2 text-sm">{description}</div>
                {children}
                <div className="flex flex-col gap-4 justify-center mt-4">
                    <button onClick={() => onClose()} className="px-4 py-2 bg-blue-500 text-white rounded-md">{choice}</button>
                    <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 text-black rounded-md">{cancle}</button>
                </div>
            </div>
        </div>
    );
}

export default LargeModal