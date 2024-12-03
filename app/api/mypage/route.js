import { NextResponse } from "next/server";
import { fet } from "../../../utils/fetch/fet"

export async function GET() {
    // 서버 엔드포인트 지정
    const response = await fet.get("/api/member/101");
    return NextResponse.json(await response.json());
};