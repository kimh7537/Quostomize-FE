import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function PATCH(request) { // 스위칭

    const session = await auth();

    const body = await request.json();  // 요청 본문을 JSON으로 파싱
    
    const response = await fetch(`${process.env.SERVER_URL}/v1/api/stocks/select/change-rank`, // 서버 엔드포인트 지정
        {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            body: JSON.stringify(body),
            credentials: "include",
            cache: "no-store"
        }
    );

    if (!response.status === 204) {
        const errorData = await response.json();
        return NextResponse.json(
            { message: errorData.message || '서버 오류 발생', status: response.status }
        );
    }
    return new Response(null, {
        status: 204,
    });

};