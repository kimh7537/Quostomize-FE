'use client'

import React, { useEffect, useState } from 'react'
import 'material-icons/iconfont/material-icons.css';
import { useRouter } from 'next/navigation';

const SignupFirst = ({ setPage, firstForm, setFirstForm }) => {
    const [error, setError] = useState(false) // 비밀번호 오류 상태 추가
    const router = useRouter()

    const changeInfo = (value, index) => {
        const newData = [...firstForm]
        const addData = { placeholder: newData[index].placeholder, value: value, type: newData[index].type }
        newData.splice(index, 1, addData)

        // 비밀번호 필드인 경우에만 검증
        if (newData[index].placeholder === "비밀번호") {
            if (!validatePassword(value)) {
                setError(true); // 조건 불만족 시 오류 상태 업데이트
            } else {
                setError(false); // 조건 만족 시 오류 상태 해제
            }
        }

        // 이메일 필드인 경우에만 검증
        if (newData[index].placeholder === "이메일") {
            if (!validateEmail(value)) {
                setError(true); // 조건 불만족 시 오류 상태 업데이트
            } else {
                setError(false); // 조건 만족 시 오류 상태 해제
            }
        }

        setFirstForm(newData)
    }
    const toLogin = () => {
        router.push("/login")
    }

    const toHome = () => {
        router.push("/home")
    }

    const toNextPage = () => {
        // if (validateRePassword() && firstForm[0].value !== "" && firstForm[1].value !== "" && firstForm[2].value !== "") {
        const newData = [false, true, false, false]
        setPage(newData)
        // } else {
        //     setError(true)
        //     setTimeout(() => {
        //         setError(false)
        //     }, 1000);
        // }
    }

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password); // 대문자 체크
        const hasLowerCase = /[a-z]/.test(password); // 소문자 체크
        const hasNumber = /\d/.test(password); // 숫자 체크
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자 체크
        const isLongLength = password.length >= 8;

        // 비밀번호가 조건을 만족하는지 검사
        if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongLength) {
            return true;
        } else if (password === "") {
            return true;
        } else {
            return false;
        }
    }

    const validateRePassword = () => {
        const newData = [...firstForm]
        const rePasswrodData = newData[4]?.value
        const passwordData = newData[3]?.value
        // 비밀번호값의 일치여부를 검사
        if (rePasswrodData == passwordData && passwordData !== "") {
            return true;
        } else {
            return false;
        }
    }

    const validateEmail = (email) => {
        const hasSpecialChar1 = /[@]/.test(email);
        const hasSpecialChar2 = /[.]/.test(email);

        // 이메일이 조건을 만족하는지 검사
        if (hasSpecialChar1 && hasSpecialChar2) {
            return true;
        } else if (email === "") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <button className="material-icons cursor-pointer m-6" onClick={toHome}>arrow_back_ios</button>
            <h1 className="font-bold font5 p-3 mb-16">회원가입</h1>
            <form action={toNextPage}>
                {firstForm.map((signupInfo, index) => {
                    if (firstForm[index]?.placeholder === "아이디") {
                        return (
                            <div key={index} className='flex'>
                                <input
                                    className="w-full m-2 p-4 rounded-xl font2 bg-gray-200"
                                    type={signupInfo?.type}
                                    placeholder={signupInfo?.placeholder}
                                    value={signupInfo?.value}
                                    onChange={(e) => changeInfo(e.target.value, index)}
                                    maxLength={15}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div key={index} className='flex justify-center'>
                                <input
                                    className="w-full m-2 p-4 rounded-xl font2 bg-gray-200"
                                    type={signupInfo.type}
                                    placeholder={signupInfo.placeholder}
                                    value={signupInfo.value}
                                    onChange={(e) => { changeInfo(e.target.value, index) }}
                                />
                            </div>
                        )
                    }
                })}

                {/* 오류 메시지 */}
                {error && (
                    <div className="flex justify-center text-red-500 mt-2">
                        <p>입력값이 올바르지 않거나 값이 없습니다. 다시 입력해주세요</p>
                    </div>
                )}

                <div className='flex justify-center'>
                    <button className="bg-black rounded-3xl w-5/6 h-20 font3 font-sans text-white font-semibold mt-8">다음</button>
                </div>
            </form>

            <div className='flex justify-center mt-16'>
                <p>이미 계정이 있으신가요?</p>
                <button className="font-bold" onClick={toLogin}> 로그인 하기</button>
            </div>

        </>
    )
}

export default SignupFirst