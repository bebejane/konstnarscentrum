import type { NextRequest, NextResponse } from 'next/server'
import { buildClient } from '@datocms/cma-client';

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {
  const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN });
  const itemTypes = await client.itemTypes.list();

}