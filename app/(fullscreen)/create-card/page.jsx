"use client"

import SelectPoint1 from '../../../components/create-card/select-point/select-point1';
import SelectPoint2 from '../../../components/create-card/select-point/select-point2';
import CreateCardBottom from '../../../components/create-card/create-card-bottom';
import SelectCardImage from '../../../components/create-card/card-detail/select-card-image';
import SelectCardDetail from '../../../components/create-card/card-detail/select-card-detail';
import SelectDesign1 from '../../../components/create-card/select-design/select-design1'
import SelectDesign3 from '../../../components/create-card/select-design/select-design3'
import SelectBenefit1 from '../../../components/create-card/select-benefit/select-benefit1';
import SelectBenefit2 from '../../../components/create-card/select-benefit/select-benefit2';
import Terms from '../../../components/create-card/terms/terms';

import React, { useState } from "react";

const CreateCardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      justifyContent: "space-between",
    },
    content: {
      flex: 1,
      overflowY: "auto",
    },
  };

  // 현재 페이지에 따라 렌더링할 콘텐츠
  const renderContent = () => {
    switch (currentPage) {

      case 1:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
          <SelectDesign1 />
          <SelectDesign3 />
        </div>;

      case 2:
        return <div>
          <header>
            <SelectBenefit1 onClick={handlePrevPage} />
          </header>
          <SelectBenefit2 />
        </div>;

      case 3:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
          <SelectPoint2 />
        </div>;

      case 4:
        return <div>
          <header>
            <SelectPoint1 onClick={handlePrevPage} />
          </header>
          <SelectCardImage />
          <SelectCardDetail />
        </div>;
      
      case 6:
        return <div>
        <header>
          <SelectPoint1 onClick={handlePrevPage} />
        </header>
        <Terms />
      </div>;
    }
  };


  return (
    <div>
      <div style={styles.content}>{renderContent()}</div>
      <CreateCardBottom onClick={handleNextPage} />
    </div>
  );
}

export default CreateCardPage;