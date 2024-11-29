'use client';

import React, { useState, useEffect } from 'react';

const CheckModal = ({ onClose, onComplete, isConfirm, setNumber, number1 }) => {
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const MAX_LENGTH = 6;

    useEffect(() => {
        shuffleNumbers();
        setNumber([])
    }, []);

    const shuffleNumbers = () => {
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
    };

    const handleKeyPress = (digit) => {
        if (number1.length < MAX_LENGTH) {
            const immediatedData = [...number1]
            immediatedData.push(digit)
            setNumber(immediatedData);
        }
        if (number1.length + 1 === MAX_LENGTH) {
            setTimeout(() => onClose(false), 100);
        }
    };

    const handleDelete = () => {
        const immediatedData = [...number1]
        immediatedData.pop()
        setNumber(immediatedData);
    };

    return (
        <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className="w-[576px] bg-[#192436] h-full flex flex-col items-center">
                <button
                    onClick={onClose}
                    className="self-start text-white mt-4 ml-4"
                >
                    ←
                </button>

                <h3 className="text-white text-lg mt-20 mb-6">
                    {isConfirm}
                </h3>

                <div className="flex justify-center space-x-3 mb-20">
                    {Array(MAX_LENGTH)
                        .fill(0)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${idx < number1?.length ? 'bg-gray-300' : 'bg-gray-600'
                                    }`}
                            />
                        ))}
                </div>

                <div className="mt-40 grid grid-cols-3 gap-16 text-center text-white w-full max-w-[400px]">
                    {shuffledNumbers.slice(0, 9).map((number, index) => (
                        <button
                            key={`button-${number}`}
                            onClick={() => handleKeyPress(number)}
                            className="text-2xl"
                        >
                            {number}
                        </button>
                    ))}
                    <div key="empty-space" />
                    <button
                        key={`button-${shuffledNumbers[9]}`}
                        onClick={() => handleKeyPress(shuffledNumbers[9])}
                        className="text-2xl"
                    >
                        {shuffledNumbers[9]}
                    </button>
                    <button
                        key="delete-button"
                        onClick={() => handleDelete()}
                        className="text-2xl"
                    >
                        ←
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckModal;