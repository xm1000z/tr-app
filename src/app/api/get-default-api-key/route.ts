// pages/api/get-default-api-key.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ defaultApiKey: process.env.OPENAI_API_KEY || '' });
}
