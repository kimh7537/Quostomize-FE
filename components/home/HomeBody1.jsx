"use client";

import React, { useState } from "react";
import ArrowButtonV3 from "../../components/button/arrow-button-v3";
import FadeInSection from "../fade-in/fade-in-section";
import GradientText from "../../components/card/gradientText";
import ColorInfo from "../card/colorInfo";
import FlipCard2 from "../../components/card/flip-card2";

const colors = ["#ed3ef7", "#000000", "#ff0000", "#dbff3d", "#ffffff"];
const colorKeys = [1, 2, 3, 4, 5]

const HomeBody1 = () => {
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const changeColor = (index) => {
        setCurrentColorIndex(index);
        setSelectedIndex(index); // 색상이 변경되면 선택 상태도 업데이트
    };

    const handleArrowClick = (direction) => {
        let newIndex;
        if (direction === "prev") {
            newIndex = (currentColorIndex === 0) ? colors.length - 1 : currentColorIndex - 1;
        } else {
            newIndex = (currentColorIndex === colors.length - 1) ? 0 : currentColorIndex + 1;
        }
        setCurrentColorIndex(newIndex);
        setSelectedIndex(newIndex); // 화살표 클릭 시 선택 상태 업데이트
    };

    return (
        <FadeInSection>
            <div className="mt-24 flex flex-col justify-center items-center">
                <FadeInSection>
                    <div className="font4 text-center font-semibold">
                        <p className="font2">우리카드 신규 서비스</p>
                        <p className="font5">
                            <GradientText text={"커스터마이징 카드"}
                                style={ColorInfo[currentColorIndex].style} />
                        </p>
                    </div>
                </FadeInSection>

                <div className="flex w-max-80 mt-24 mb-4 space-x-20">
                    <ArrowButtonV3 direction="prev" onClick={() => handleArrowClick("prev")} />
                    <div>
                        {currentColorIndex !== null ? (
                            <FlipCard2
                                frontImg={`/cards-images/${colorKeys[currentColorIndex]}f.png`}
                                backImg={`/cards-images/${colorKeys[currentColorIndex]}b.png`}
                            />
                        ) : (
                            <div>카드 색상이 없습니다.</div>
                        )}
                    </div>
                    <ArrowButtonV3 direction="next" onClick={() => handleArrowClick("next")} />
                </div>

                {/* 색상 미리 보기 원들 */}
                <div className="flex space-x-4 mt-20">
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => changeColor(index)}
                            className={`w-4 h-4 rounded-full shadow-xl transition-all ${selectedIndex === index ? "ring-2 ring-blue-500" : ""
                                }`}
                            style={{
                                backgroundColor: color,
                                boxShadow: selectedIndex === index ? "0 0 10px rgba(0, 0, 0, 0.5)" : "0 0 5px rgba(0, 0, 0, 0.3)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </FadeInSection>
    );
};

export default HomeBody1;
