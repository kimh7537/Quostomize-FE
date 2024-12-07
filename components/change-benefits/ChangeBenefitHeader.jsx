import React from 'react'
import PageHeader from "../../components/header/PageHeader";


const ChangeBenefitHeader = ({ onClick }) => {

    return (
        <div>
            <PageHeader
                modaltitle="포인트 혜택 변경"
                description={
                    <>
                        변경을 취소하시겠습니까?
                        <br />
                        (변경 사항이 저장 되지 않습니다.)
                    </>
                }
                showArrowButton={false}
                onArrowClick={onClick}
                exitDirection="/my-card"

            >
                포인트 혜택 변경
            </PageHeader>
        </div>
    )
}

export default ChangeBenefitHeader