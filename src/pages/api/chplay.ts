import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing app id" });
  }

  try {
    const response = await axios.get(
      `https://play.google.com/store/apps/details`,
      {
        params: req?.query,
      }
    );

    const html = response.data;

    // Regular expression to extract specific data from the HTML
    const descriptionMatch = html.match(
      /<div itemprop="description">([\s\S]*?)<\/div>/
    );
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/<[^>]+>/g, "").trim()
      : "Description not found";

    const appDetails = {
      description,
      ...req?.query,
    };

    res.status(200).json(appDetails);
  } catch (error) {
    console.error("Error fetching app details:", error);
    res.status(500).json({ error: "Failed to fetch app details" });
  }
}
