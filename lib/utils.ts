import { TypedDocumentNode } from "@apollo/client/core";
import { datoError } from "dato-nextjs-utils/api";
import { apiQuery } from "dato-nextjs-utils/api";
import { regions } from "/lib/region";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

export const isServer = typeof window === 'undefined';

export const breakpoints = {
  mobile: 320,
  tablet: 740,
  desktop: 980,
  wide: 1441,
  navBreak: 1368
}

export const pageSize = 10;

export const chunkArray = (array: any[] | React.ReactNode[], chunkSize: number) => {
  const newArr = []
  for (let i = 0; i < array.length; i += chunkSize)
    newArr.push(array.slice(i, i + chunkSize));
  return newArr
}

export const catchErrorsFrom = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res).catch((error) => {
      const err = datoError(error)
      console.log(err)
      res.status(500).send(err);
    });
  }
}

export const recordToSlug = (record: any, regional: boolean = true): string => {

  if (!record) {
    console.error('reecord is undefined')
    return '/'
  }

  if (typeof record === 'string')
    return record

  const { __typename, slug } = record

  switch (__typename) {
    case 'CommissionRecord':
      return `/anlita-oss/uppdrag/${slug}`
    case 'MemberRecord':
      return `/anlita-oss/hitta-konstnar/${slug}`
    case 'NewsRecord':
      return `/nyheter/${slug}`
    case 'MemberNewsRecord':
      return `/konstnar/aktuellt/${slug}`
    case 'AboutRecord':
      return `/om/${slug}`
    default:
      throw Error(`${__typename} is unknown record slug!`)
  }
}

export const isEmail = (string: string): boolean => {
  const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (string.length > 320) return false;
  return matcher.test(string);
}

export const fetchAllRecords = async (query: TypedDocumentNode, type?: string) => {
  const posts = []

  for (let page = 0, count; posts.length < count || page === 0; page++) {
    const res = await apiQuery(query, { variables: { first: 100, skip: (page * 100) } })
    const key = type || Object.keys(res).find(k => k !== 'pagination')
    posts.push.apply(posts, res[key]);
    count = res.pagination.count;
  }

  return posts
}

export const getStaticPaginationPaths = async (query: TypedDocumentNode, segment: string, regional: boolean = false) => {

  const paths = []
  const items = await fetchAllRecords(query)


  if (regional) {
    regions.forEach((region) => {
      const pages = chunkArray(items.filter(p => p.region.id === region.id), pageSize)
      pages.forEach((posts, pageNo) => {
        paths.push.apply(paths, posts.map(p => ({
          params: {
            region: region.slug,
            [segment]: p.slug,
            page: `${pageNo + 1}`,

          }
        })))
      })
    })
  } else {
    const pages = chunkArray(items, pageSize)
    pages.forEach((posts, pageNo) => {
      paths.push.apply(paths, posts.map(p => ({
        params: {
          [segment]: p.slug,
          page: `${pageNo + 1}`
        }
      })))
    })
  }

  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticPagePaths = async (query: TypedDocumentNode, segment: string, regional: boolean = false) => {
  const items = await fetchAllRecords(query)
  const paths = []

  items.forEach(({ slug, region: { id, slug: regionSlug } }) => {
    const params = { [segment]: slug }
    paths.push(!regional ? { params } : { params: { ...params, region: regionSlug } })
  })

  return {
    paths,
    fallback: 'blocking'
  }
}
