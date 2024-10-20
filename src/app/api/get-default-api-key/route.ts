// pages/api/get-default-api-key.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ defaultApiKey: process.env.OPENAI_API_KEY || '' });
}

