import type { NextRequest, NextResponse } from 'next/server'
import { apiQuery } from 'dato-nextjs-utils/api';
import { SearchMembersDocument, SearchMembersFreeDocument } from '/graphql';

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {

  const { query, city, memberCategoryIds } = await req.json();

  const variables = {
    city,
    memberCategoryIds,
    query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
  };

  if (Object.keys(variables).filter(k => variables[k] !== undefined).length === 0) {
    return new Response(JSON.stringify({ members: [] }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  }

  const { members } = await apiQuery(query ? SearchMembersFreeDocument : SearchMembersDocument, { variables })

  return new Response(JSON.stringify({ members }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  })
}