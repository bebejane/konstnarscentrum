import type { NextRequest, NextResponse } from 'next/server'
import { apiQuery } from 'dato-nextjs-utils/api';
import { buildClient } from '@datocms/cma-client-browser';
import { SearchMembersDocument, SearchMembersFreeDocument, SiteSearchDocument } from '/graphql';
const isEmpty = (obj: any) => Object.keys(obj).filter(k => obj[k] !== undefined).length === 0

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest, res: NextResponse) {

  const params = await req.json();

  if (params.type === 'member') {

    const members = await memberSearch(params)
    return new Response(JSON.stringify({ members }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })

  } else if (params.type === 'site') {

    const results = await siteSearch(params)
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    })
  }
}

const memberSearch = async (opt) => {

  const { query, regionId, memberCategoryIds } = opt;

  const variables = {
    regionId,
    memberCategoryIds,
    query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
  };

  if (isEmpty(variables))
    return []

  const { members } = await apiQuery(query ? SearchMembersFreeDocument : SearchMembersDocument, { variables })
  return members
}


export const siteSearch = async (opt: any) => {

  const { query, regionId } = opt;

  const variables = {
    regionId,
    query: query ? `${query.split(' ').filter(el => el).join('|')}` : undefined
  };

  if (isEmpty(variables))
    return {}

  const client = buildClient({ apiToken: process.env.GRAPHQL_API_TOKEN });
  const itemTypes = await client.itemTypes.list();

  const search = (await client.items.list({
    filter: {
      type: itemTypes.map(m => m.api_key).join(','),
      query,
    },
    order_by: '_rank_DESC'
  })).map(el => ({
    ...el,
    _api_key: itemTypes.find((t) => t.id === el.item_type.id).api_key,
  }))


  const data = await apiQuery(SiteSearchDocument, {
    variables: {
      memberIds: search.filter(el => el._api_key === 'member').map(el => el.id),
      newsIds: search.filter(el => el._api_key === 'news').map(el => el.id),
      memberNewsIds: search.filter(el => el._api_key === 'member_news').map(el => el.id)
    }
  })

  Object.keys(data).forEach(type => {
    if (!data[type].length)
      delete data[type]
    else {
      data[type] = data[type].map(normalizeSiteResult)
    }

  })

  return data;
}

const normalizeSiteResult = (item: any): any => {
  const { __typename } = item;

  switch (__typename) {
    case 'MemberRecord':
      return { title: `${item.fullName}`, text: item.bio, image: item.image, __typename }
    case 'MemberNewsRecord':
      return { title: item.title, text: item.intro, image: item.image, __typename }
    case 'NewsRecord':
      return { title: item.title, text: item.intro, image: item.image, __typename }
    default:
      console.log('type name not found', __typename)
      return {}
  }
}