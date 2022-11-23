import { datoError } from "dato-nextjs-utils/api";

export const isServer = typeof window === 'undefined';

export const breakpoints = {
  mobile: 320,
  tablet: 740,
  desktop: 980,
  wide: 1441,
  navBreak: 1368
}

export const catchErrorsFrom = (handler) => {
  return async (req, res) => {
    return handler(req, res).catch((error) => {
      const err = datoError(error)
      res.status(500).send(err);
    });
  }
}