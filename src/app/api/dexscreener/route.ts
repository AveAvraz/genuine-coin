import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/token-profiles/latest/v1",
      {
        method: "GET",
        headers: {},
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data); // Send a JSON response back
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
