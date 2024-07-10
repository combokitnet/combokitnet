import { NextApiRequest, NextApiResponse } from "next";
import { tools } from "./tool";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const tool = tools.find((tool) => tool?.id === id);

    if (!tool) {
        return res.status(404).json({ message: 'Tool not found' });
    }

    res.status(200).json(tool);
}