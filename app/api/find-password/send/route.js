'use server';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        const requestBody = {
            phone: body.phoneNumber,
            certificationNumber: ""
        };

        const response = await fetch(
            `${process.env.SERVER_URL}/v1/api/auth/search-password/send`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || "인증번호 전송에 실패했습니다." },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}