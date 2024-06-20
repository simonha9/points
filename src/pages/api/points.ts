import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: NextRequest) {
  if (req.method === 'GET') {
    return GET(req);
  } else if (req.method === 'POST') {
    return POST(req);
  }

}

async function GET(req: NextRequest) {
  const myKv = getRequestContext().env.POINTS_KV;
  const points = await myKv.get('points');

  return new Response(points);
}

async function POST(req: NextRequest) {
  const myKv = getRequestContext().env.POINTS_KV;
  const body = await req.json() as any;
  const points = body.total;
  console.log("points", points, body);
  await myKv.put('points', points);

  return new Response('OK');
}