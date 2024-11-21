import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const { email_address } = await request.json()

        const response = await fetch('https://api.clerk.com/v1/invitations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_address,
                redirect_url: 'http://localhost:3000/sign-in' })
        })

        // Directly return Clerk's response
        const responseData = await response.json()

        return NextResponse.json(
            responseData,
            { status: response.status }
        )

    } catch (error) {
        console.error('Invitation error:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}