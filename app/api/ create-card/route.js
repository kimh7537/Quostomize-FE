'use server'
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(request) {
    const session = await auth();
    const body = await request.json();
    try {
        const response = await fetch(`${process.env.SERVER_URL}/v1/api/card-applicants`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}`
                },
                credentials: "include",
                cache: "force-cache",
                body: JSON.stringify(body) // body를 JSON 문자열로 변환
            }
        );

        if (response.status === 401 || response.status === 403) {
            return NextResponse.redirect(new URL("/login", `${process.env.NEXT_URL}`));
        } else {
            const result = await response.json();
            return NextResponse.json(result, {status:200});
        }
    } catch (err) {
        return NextResponse.json({message:"네트워크가 불안정하거나 서버에서 오류가 발생했습니다.\n잠시 후 다시 시도해주세요."}, {status:500})
    }
};