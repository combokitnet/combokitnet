import { NextApiRequest, NextApiResponse } from 'next';

export type TTool = {
    id: string;
    name: string;
    link: string;
    tag: string[];
    tagColor?: string;
    icon: string; // url
    description: string;
    rate: number;
    usageCount: number;
    author: string;
    authorUrl?: string;
    createdAt?: Date;
    isHot?: boolean;
    isNew?: boolean;
    isRecent?: boolean;
    status: "active" | "lock" | "comming";
    suggestData?: string[];
};


export type TToolTag = {
    tag: string;
    tagColor: string;
};


export const tools: TTool[] = [
    {
        name: "Image Compression",
        tag: ["utility", "image"],
        icon: "/images/tools/image_compression.svg",
        description: "WebP, PNG, JPEG, GIF and SVG Compression",
        rate: 4.5,
        usageCount: 1200,
        author: "Combokit.Net",
        status: "active",
        link: "/tools/image-compression",
        suggestData: [
            'image', 'compression', 'tiny', 'webp', 'png', 'gif', 'svg', 'jpeg', 'optimize', 'reduce size'
        ],
        id: '1'
    },
    {
        name: "Smart Downloader",
        tag: ["utility", 'downloader'],
        icon: "/images/tools/0.svg",
        description: "Smarter downloader: youtube, tiktok, douyin,...",
        rate: 4.0,
        usageCount: 800,
        author: "Combokit.Net",
        status: "comming",
        link: "/tools/smart-downloader",
        suggestData: [
            'downloader',
            'youtube', 'tiktok', 'douyin', 'facebook', 'reel'
        ],
        id: '2'
    },
    {
        name: "Code Converter",
        tag: ["development", 'code'],
        icon: "/images/tools/0.svg",
        description: "Convert you code to other language",
        rate: 4.8,
        usageCount: 500,
        author: "Combokit.Net",
        status: "comming",
        link: "/tools/code-converter",
        id: '3'
    },
    {
        name: "Password Generator",
        tag: ["security", 'generator'],
        icon: "/images/tools/0.svg",
        description: "Generate secure, random passwords to stay safe online",
        rate: 4.8,
        usageCount: 500,
        author: "Combokit.Net",
        status: "comming",
        link: "/tools/password-generator",
        id: '4'
    },
    {
        name: "QR Code Generator",
        tag: ["qrcode", 'generator'],
        icon: "/images/tools/0.svg",
        description: "Create your QRCode faster and awesome",
        rate: 4.8,
        usageCount: 500,
        author: "Combokit.Net",
        status: "comming",
        link: "/tools/qrcode",
        id: '5'
    },

]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(tools);
}
