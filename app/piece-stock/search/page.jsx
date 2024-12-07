'use client'

import { useEffect, useState } from "react";
import SearchHeader from "../../../components/piece-stock/search/header"
import SearchBody from "../../../components/piece-stock/search/body"
import SearchBottom from "../../../components/piece-stock/search/bottom"
import { useSession } from "next-auth/react";

const SearchPage = () => {

  const [value, setValue] = useState(""); // 입력값
  const [searchInfo, setSearchInfo] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [cardData, setCardData] = useState([]) // 카드데이터-카드아이디뽑기용

  useEffect(() => {
    searchCardInfo()
  }, []);

  const cardId = cardData[0]?.cardSequenceId

  // 백엔드에서 GET 위시리스트 조회시, 위시리스트의 priority, stockName, stockPresentPrice, stockImage 를 갖고온다.
  const searchCardInfo = async () => {
    try {
      const response = await fetch(`/api/piece-stock/favorite/searchCardId`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
        },
      });

      if (!response.ok) {
        throw new Error('값이 조회되지 않았습니다.');
      }
      const data = await response.json(); // 응답을 JSON으로 파싱
      setCardData(data);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  }

  return (
    <div className="p-4">
      <SearchHeader setValue={setValue} setSearchInfo={setSearchInfo} searchInfo={searchInfo} value={value}/>

      {cardId !== undefined && <SearchBody searchInfo={searchInfo} setSelectedStocks={setSelectedStocks} selectedStocks={selectedStocks} />}

      {cardId !== undefined && <SearchBottom selectedStocks={selectedStocks} cardId={cardId}/>}
    </div>
  );
}

export default SearchPage;