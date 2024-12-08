import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Motion from "../../../components/piece-stock/etc/motion"
import InverseMotion from "../../../components/piece-stock/etc/inverseMotion"
import LargeModal from '../../overlay/largeModal'
import { openModal, closeModal, checkButton, choiceStocks } from "../../../components/piece-stock/home/component/totalSearch"
import { handleDragStart, handleDragEnd, handleDragOver, handleDrop, handleDeleteClick, deleteCheckBox } from "../../../components/piece-stock/home/component/totalHomeBody"
import { searchCardInfo, switchStock, searchWishStocks } from "../../../components/piece-stock/home/apiMethod/apiList"
import RecommendAlertModal from '../etc/recommendAlertModal'

const HomeBody = ({ data, page, setPage, cardData, setCardData, wishInfo, setWishInfo }) => {
    const [hoveredIndex, setHoveredIndex] = useState([{ order: 0 }, { order: 0 }, { order: 0 }]); // Hover된 항목의 인덱스를 관리
    const [orderInfo, setOrderInfo] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [isClickButton, setClickButton] = useState([false, false, false]);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [recommendStockInfo, setRecommend] = useState([]);
    const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값

    const totalData = [];
    const saveData = [];
    let compareData;


    const param = new URLSearchParams();
    const paramSave = new URLSearchParams();
    const cardId = cardData[0]?.cardSequenceId

    useEffect(() => {
        searchCardInfo(setCardData)
    }, [])

    useEffect(() => {
        switchStock(orderInfo);
    }, [orderInfo])

    const myStock = data?.output1?.map((stock) => ({
        stockName: stock?.prdtName,
        stockPrice: stock?.prpr,
        stockRate: stock?.evluPflsRt,
        stockNumber: stock?.hldgQty,
        stockImage: stock?.stockImage,
    }));

    return (
        <div className='flex flex-col justify-center items-center'>


            <div className="mt-8 w-11/12">
                <div className="flex justify-between items-center">
                    <div>
                        <button className={`p-3 font3 font-bold outline-none ${page[0] === true ? `border-b-4` : null} border-[#3384f6]`} onClick={() => setPage([true, false, false])}>보유</button>
                        <button className={`p-3 font3 font-bold outline-none ${page[1] === true ? `border-b-4` : null} border-[#3384f6]`} onClick={() => onFavorite(param, setWishInfo, setPage, cardId)}>관심</button>
                    </div>
                    <div>
                        <button className='p-3 font2 font-bold outline-none rounded-lg bg-[#3384f6] text-white' onClick={() => openModal(setOpen, param, setRecommend, cardId)}>주식 추천</button>
                    </div>
                </div>

                <div className="flex-grow overflow-auto mt-8">
                    {page[0] && myStock !== undefined && myStock.map((stock) => (
                        <div
                            key={stock.stockName}
                            className={`flex border shadow-md items-center justify-between p-5 rounded-lg mb-5`}
                        >
                            <div className="flex items-center gap-5">
                                {stock.stockImage && <Image src={stock.stockImage} width={100} height={100} alt="주식이미지"></Image>}
                                <div>
                                    <div className="font1 font-semibold" style={{
                                        letterSpacing: '0.05em'
                                    }}>{stock.stockName}</div>
                                    <span className="font1 text-[#787B7E] ml-1">{stock.stockNumber}주</span>
                                </div>
                            </div>
                            <div className="text-right flex flex-col">
                                <div className="font1 font-semibold">{Number(stock.stockPrice).toLocaleString()} 원</div>
                                <div className="font-semibold">
                                    <p className={`font-bold ${stock.stockRate > 0 ? `text-[#E46E61]` : `text-[#0B5CD8]`}`}>{stock.stockRate > 0 ? "+" + stock.stockRate + " %" : stock.stockRate + " %"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {page[1] && (
                        <div className='overflow-x-hidden'>
                            <div className="font2 ml-3 mb-8">관심 주식을 위아래로 드래그 하여 매수 희망 순위를 바꿀 수 있어요! </div>
                            {wishInfo !== undefined && wishInfo.map((wishStock, index) => (
                                <div
                                    className="flex relative cursor-grab p-5 shadow-md mb-5 rounded-lg border"
                                    key={wishStock.stockName}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index, setDragOverIndex)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index, wishInfo, dragOverIndex, setOrderInfo, setWishInfo, setDragOverIndex, cardId)}
                                    onClick={() => deleteCheckBox(index, hoveredIndex, setHoveredIndex)}
                                >
                                    <Motion hoveredIndex={hoveredIndex} index={index}>
                                        <div className="flex">
                                            <span className="mr-2 font-semibold flex items-center">{wishStock.priority}.</span>
                                            <Image src={wishStock.stockImage} width={100} height={100} alt="주식이미지"></Image>
                                            <div className="flex h-full items-center ml-3 font-bold font1" style={{
                                                letterSpacing: '0.05em'
                                            }}>
                                                <p>{wishStock.stockName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center font-semibold font1">
                                            <p>{Number(wishStock.stockPresentPrice).toLocaleString()} 원</p>
                                        </div>
                                    </Motion>
                                    <div>
                                        <InverseMotion hoveredIndex={hoveredIndex} index={index} onClick={() => handleDeleteClick(index, param, setWishInfo, wishInfo, cardId)}>
                                            <button>삭 제</button>
                                        </InverseMotion>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {isOpen && <LargeModal className="bg-[#FFFFFF] rounded-t-3xl p-6 w-full"
                        title={
                            <span className="font2 font-bold text-center mb-2">
                                내가 선택한
                                <span className="text-[#3081F7]">{` 카드 혜택 \n`}</span>
                                <br />
                                관련 종목은 다음과 같아요.
                            </span>

                        }
                        description={
                            <p className="font1 text-center mb-6">
                                내가 선택한 카드 혜택을 기반으로 찾은 종목이에요.
                                <br />
                                원하는 만큼 관심 종목에 담아보세요.
                            </p>
                        }
                        onClose={() => choiceStocks(wishInfo, isClickButton, setShowAlertModal, recommendStockInfo, totalData, paramSave, saveData, compareData, setWishInfo, setOpen, setPage)}
                        setIsOpen={() => closeModal(setOpen)}
                        choice={"관심목록에 추가하기"}
                        cancle={"닫기"}>
                        {recommendStockInfo.map((stock, index) => (
                            <div key={stock.stockName} className={`flex justify-between items-center p-4 m-1 border rounded-xl shadow-lg cursor-pointer ${isClickButton[index] === true ? `border-2 border-slate-300 bg-slate-200` : `border-slate-200 `}`} onClick={() => checkButton(index, setClickButton)}>
                                <div className={`flex justify-between w-full`}>
                                    <div className="flex">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                                            <Image src={stock.stockImage} width={30} height={30} alt="주식이미지"></Image>
                                        </div>
                                        <div className="flex h-full items-center ml-4">
                                            <p className="font-medium">{stock.stockName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-[#43505E] text-sm">{Number(stock.stockPresentPrice).toLocaleString()} 원</p>
                                    </div>
                                </div>
                                {showAlertModal && <RecommendAlertModal
                                    title={"관심 목록은 최대 3개까지 담을 수 있어요 기존 목록을 수정해 주세요"}
                                />}
                            </div>
                        ))}
                    </LargeModal>}
                </div>
            </div>
        </div>
    )
}

async function onFavorite(param, setWishInfo, setPage, cardId) {
    searchWishStocks(param, setWishInfo, cardId)
    setPage([false, true, false]); // 작업 완료 후 페이지 변경
}


export default HomeBody