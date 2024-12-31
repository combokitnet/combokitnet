import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(request: NextRequest, event: any) {
  console.log("context", request.url);
  const query = request.url?.split("api/chplay")[1];

  try {
    const response = await axios.get(
      `https://play.google.com/store/apps/details${query}`
    );

    const html = response?.data;

    // Regular expression to extract specific data from the HTML
    const descriptionMatch = html.match(
      /<div itemprop="description">([\s\S]*?)<\/div>/
    );
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/<[^>]+>/g, "").trim()
      : "Description not found";

    const appDetails = {
      description,
    };
    return NextResponse.json({
      message: "ok",
      query,
      ...appDetails,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching app details:", error);

    return NextResponse.json({
      message: "Error fetching app details",
      query,
      success: false,
    });
  }
}
