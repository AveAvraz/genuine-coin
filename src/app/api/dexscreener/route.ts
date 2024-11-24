import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching data from Dexscreener API...");
    const response = await fetch(
      "https://api.dexscreener.com/token-profiles/latest/v1",
      {
        method: "GET",
        headers: {},
      }
    );

    console.log("Response Status:", response.status);
    if (!response.ok) {
      console.error("Dexscreener API Error:", response.statusText);
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched Data:", data);

    return NextResponse.json(data); // Send a JSON response back
  } catch (error: unknown) {
    console.error("API Route Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


