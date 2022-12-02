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

export const pageSize = 1;

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

export const recordToSlug = (record: any): string => {
  switch (record?.__typename) {
    case 'CommissionRecord':
      return '/'
    case 'MemberNewsRecord':
      return '/'
    case 'NewsRecord':
      return '/'
    default:
      return '/'
  }
}

export const isEmail = (string: string): boolean => {
  const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (string.length > 320) return false;
  return matcher.test(string);
}

export const pagination = {
  getStaticPaths: async (query: TypedDocumentNode, type: string) => {

    const paths = []
    const posts = []

    for (let page = 0, count; posts.length < count || page === 0; page++) {
      const res = await apiQuery(query, { variables: { first: 100, skip: (page * 100) } })
      const key = Object.keys(res).find(k => k !== 'pagination')
      posts.push.apply(posts, res[key]);
      count = res.pagination.count;
    }

    posts.forEach(({ slug, region }) => {
      paths.push({ params: { region: '', [type]: slug, page: '' } })
      paths.push({ params: { region: region.slug, [type]: slug, page: '' } })
    })

    chunkArray(posts, pageSize).forEach(({ news }, idx) => {
      paths.push({ params: { region: '', [type]: '', page: `${idx + 1}` } })
    })

    regions.forEach((region) => {
      const pages = chunkArray(posts.filter(p => p.region.id === region.id), pageSize)
      const slugs = pages.map((p, idx) => ({ params: { [type]: '', region: region.slug, page: `${idx + 1}` } }))
      paths.push.apply(paths, slugs)
    })
    //console.log(paths);

    return {
      paths,
      fallback: false,
    };
  },

}