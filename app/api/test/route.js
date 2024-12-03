// 
import { NextResponse } from "next/server";
import { auth } from "../../../auth";


export async function GET() {

    const session = await auth();



    const response = await fetch(`${process.env.SERVER_URL}/v1/api/member/info`,
        {
            method: "GET",
            headers: {
                "Content-type": "application",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "no-store"
        }

    );

    
    const result = await response.json();

    if (response.status >= 400) {
        return NextResponse.json({redirectUrl:'login'}, {status: response.status})
    } else {
        return NextResponse.json(result, {status:200});
    }
};