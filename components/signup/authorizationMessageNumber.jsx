'use client'

import React, { useEffect, useRef, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const AuthorizationMessageNumber = ({ setPage, secondForm, setBlock }) => {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const [authNumber, setAuthNumber] = useState(["","","","","",""])

    useEffect(() => {
        setAuthNumber(["","","","","",""])
        // 페이지 진입시 첫 번째 입력칸에 포커스
        inputRefs[0].current?.focus();
        const authData = {
            "phone": secondForm?.[3]?.value,
            "certificationNumber": ""
        }
        authorizationByMessage(authData)
    }, []);

    // 메세지 인증번호를 요청한다.
    const authorizationByMessage = async (authData) => {
        try {
            const response = await fetch(`/api/signup/requestMessage`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                },
                body: JSON.stringify(authData),
            });
            if (!response.ok) {
                throw new Error('값이 조회되지 않았습니다.');
            }

        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    // 메세지를 검증합니다.
    const checkAuthorizationAboutMessage = async (authData) => {
        try {
            const response = await fetch(`/api/signup/authorizingAuthNumber`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // 요청 본문이 JSON임을 지정
                },
                body: JSON.stringify(authData),
            });

            if (!response.ok) {
                throw new Error('값이 조회되지 않았습니다.');
            }
        } catch (error) {
            console.error('데이터 가져오기 오류:', error);
        }
    }

    const toCheckPage = () => {
        if(authNumber.every(value => value !== "") ){
         // 해당 번호를 전송해야한다.
         const sendingData = `${authNumber[0]}${authNumber[1]}${authNumber[2]}${authNumber[3]}${authNumber[4]}${authNumber[5]}`
         const authData = {
             phone: secondForm?.[3]?.value,
             certificationNumber: sendingData
         }
          checkAuthorizationAboutMessage(authData) // ->  인증번호 요청
          const newData = [false, true, false, false]
          setPage(newData)
          setBlock(true)
        } else{
            // console.log("아직 값이 다 입력되지 않았습니다.")
        }
    }

    const toBeforePage = () => {
        const newData = [false, true, false, false]
        setPage(newData)
    }

    const reRequestMessage = () => {
        // console.log("문자 재요청")
        // 문자요청 api 를 실행하는 장소
    }

    const handleInput = (e, index) => {
        const value = e.target.value;

        // 숫자만 입력 가능하도록 처리
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        } 
        const newData = [...authNumber]
                newData.splice(index,1,value)
                setAuthNumber(newData)

        if (value.length === 1 && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    }

    return (
        <>
            <button className="material-icons cursor-pointer m-6" onClick={toBeforePage}>arrow_back_ios</button>
            <h1 className="font-bold font5  ml-5 text-blue-500">휴대폰 문자 인증</h1>
            <h2 className="font-medium font3 mb-16 ml-5 text-black ">휴대폰 번호로 인증번호가 전송되었습니다.</h2>
            <div className='m-5 p-4 bg-white rounded-xl shadow-md'>
                <h1 className='font4 font-extralight flex justify-center mb-5'>인증번호</h1>
                <form action={toCheckPage}>
                    <div className='flex'>
                        {inputRefs.map((ref, index) => {
                            return (
                                <input key={`${ref}*${index}`} ref={ref} className='text-center border w-1/6 p-5 font5 flex justify-center focus:outline-none' type="text" placeholder='0' maxLength={1} onChange={(e) => handleInput(e, index)} />
                            )
                        })}
                    </div>
                    <div className='flex justify-center'>
                        <button className="bg-blue-600 rounded-3xl w-5/6 h-20 font3 font-sans text-white font-semibold mt-8 hover:bg-blue-700">제출</button>
                    </div>
                </form>
            </div>

            <div className='flex justify-center mt-16'>
                <p>문자를 못 받으셨나요?</p>
                <button className="font-bold" onClick={reRequestMessage}>재전송</button>
            </div>
        </>
    )
}

export default AuthorizationMessageNumber