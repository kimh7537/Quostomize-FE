import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function GET(request) { // 추천종목조회

    const session = await auth();

    const url = new URL(request.url);
    const cardId = url.searchParams.get('cardId');
    const isRecommendByCardBenefit = url.searchParams.get('isRecommendByCardBenefit');
    const params = new URLSearchParams({ cardId, isRecommendByCardBenefit });

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/stocks/recommendations?${params}`, // 서버 엔드포인트 지정
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "no-store"
        }
    );

    if (!response.ok) {
        throw new Error('데이터를 가져오지 못했습니다.');
    }

    const result = await response.json();
    console.log(result.data)

    if (response.status >= 400) {
        return NextResponse.json({ redirectUrl: 'login' }, { status: response.status })
    } else {
        return NextResponse.json(result.data, { status: 200 });
    }
};