import { datoError } from "dato-nextjs-utils/api";
import { lowerFirst } from "lodash-es";
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