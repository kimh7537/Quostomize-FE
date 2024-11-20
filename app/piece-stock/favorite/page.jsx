'use client'

import Image from "Next/image"
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const [wishInfo, setWishInfo] = useState([]); // 조회한 위쉬 정보를 저장
  const [dragOverIndex, setDragOverIndex] = useState(null); // 드래깅 된 위치확인 값
  const [orderInfo, setOrderInfo] = useState([]);

  //cardId 값
  const cardId = 1;
  const param = new URLSearchParams();
  param.append("cardId", cardId);

  useEffect(() => {
    searchWishStocks();
  }, [])

  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchWishStocks = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/select?${param}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
      const data = await response.json(); // 응답을 JSON으로 파싱
      setWishInfo(data.data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  // 드래그 시작
  const handleDragStart = (e, index) => {
    setDragOverIndex(index);
    e.target.style.opacity = 0.5; // 드래그 중인 항목을 반투명하게 표시
  };

  // 드래그 끝
  const handleDragEnd = (e) => {
    e.target.style.opacity = ""; // 드래그 종료 후 원래대로 복원
  };

  // 드래그된 항목이 다른 항목 위에 올려졌을 때 (이벤트 전파 방지)
  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 동작을 막아줘야 드롭을 허용
  };

  // 드롭할 때 순서를 변경하는 함수
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    const updatedData = [...wishInfo]; // 전체조회
    const first = updatedData[dragOverIndex].priority; // 드래그 시작위치
    const second = updatedData[dropIndex].priority;  // 드래그 끝 위치

    if (first == 3 && second == 1) {
      // 인데스 교환
      updatedData[0].priority = 2; // 1번객체 2로 저장
      updatedData[1].priority = 3; // 2번객체를 3로 저장 
      updatedData[2].priority = 1; //  3번객체 1로저장 -> 결론 현재 저장 순위 2,3,1 순으로 되어있음

      const draggedItem = updatedData[dragOverIndex]; // --3번에 대한 객체
      const otherItem = updatedData[1];
      updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 3번에 대한 객체 제거 => 1번과 2번만 남음 (2,3)
      // updatedData.splice(1, 1);// -- 2번에 대한 객체 => 3번만 남음 (3)

      updatedData.splice(dropIndex, 0, draggedItem); // 드래그한 항목을 새로운 위치에 추가 -- 1번부터 0개를 삭제하고 삭제했던 3번객체를 넣는다. (1,2,3)
      // updatedData.splice(1, 0, otherItem); // (1,2,3)

    } else if (first == 1 && second == 3) {
      // 인데스 교환
      updatedData[0].priority = 3; // 1번객체 3로 저장
      updatedData[1].priority = 2; // 2번객체를 1로 저장 
      updatedData[2].priority = 1; //  3번객체 2로저장 -> 결론 현재 저장 순위 3,1,2 순으로 되어있음

      const draggedItem = updatedData[dragOverIndex]; // --1번에 대한 객체
      const otherItem = updatedData[1]; // 2번 객체
      updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 1번에 대한 객체 제거 => 1번과 2번만 남음 (1,2)
      // updatedData.splice(0, 1);// -- 2번에 대한 객체 => 3번만 남음 (1)

      // updatedData.splice(1, 0, otherItem); // 드래그한 항목을 새로운 위치에 추가 -- 3번부터 0개를 삭제하고 삭제했던 1번객체를 넣는다. (1,2,3)
      updatedData.splice(dropIndex, 0, draggedItem); // (1,2,3)
    } else {
      // 인데스 교환
      updatedData[dragOverIndex].priority = second; //  2번객체 1로저장 3번객체 1로저장
      updatedData[dropIndex].priority = first; // 1번객체 2로변경 1번객체 3로 저장

      const draggedItem = updatedData[dragOverIndex]; // 드래그한 항목 --2번에 대한 객체  --3번에 대한 객체
      const originalvalue = updatedData.splice(dragOverIndex, 1); // 드래그한 항목을 리스트에서 제거  -- 2번에 대한 객체 제거 => 1번과 3번만 남음 -- 3번에 대한 객체 제거 => 1번과 2번만 남음

      updatedData.splice(dropIndex, 0, draggedItem); // 드래그한 항목을 새로운 위치에 추가  -- 1번부터 0개를 삭제하고 삭제했던 2번 객체를 넣는다 -- 1번부터 0개를 삭제하고 삭제했던 3번객체를 넣는다.
    }

    // 이 부분은 백엔드에 보내줄 정보를 정리
    const total = [...orderInfo];
    const requestOrder = {
      currentOrder: first,
      editOrder: second
    }

    total.push(requestOrder);
    // 전송
    setOrderInfo(total)

    setWishInfo(updatedData); // 상태 업데이트
    setDragOverIndex(null); // 드래그 중인 인덱스를 초기화
  };

  const switchStock = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/stocks/select/change-rank", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
        },
        body: JSON.stringify(orderInfo),
      });
      console.log(orderInfo)
      setOrderInfo([]);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  return (
    <>
      <ul className="my-7 flex flex-col h-full">
        <div className="flex justify-center">
          <h1>
            Stock Invest
          </h1>
        </div>
        <div>
          <button className="flex justify-between w-full">
            <h2>WatchList</h2>
            <span className="material-icons">search</span>
          </button>
        </div>

        <div>
          {wishInfo.map((wishStock, index) => (
            <div className={"flex cursor-grab"}
              key={wishStock.stockName}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}>
              <div className="flex justify-between w-full">
                <div className="flex">
                  <div className="flex flex-col h-18 ml-2">
                    <p>{wishStock.priority}</p>
                    <Image src={wishStock.stockImage} width={50} height={50} alt="주식이미지"></Image>
                  </div>
                  <div className="flex h-full items-center ml-5">
                    <p>{wishStock.stockName}</p>
                  </div>
                </div>
                <p>{wishStock.stockPresentPrice}원</p>
                {/* <button onClick={(e) => deleteWish(e, index)}>버튼</button> */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button className="border-2 border-black">종목자동추천</button>
          <button className="border-2 border-black" onClick={switchStock} >저장</button>
        </div>
      </ul>
    </>
  );
}
export default FavoritePage;