import { datoError } from "dato-nextjs-utils/api";

export const catchErrorsFrom = (handler) => {
  return async (req, res) => {
    return handler(req, res).catch((error) => {
      const err = datoError(error)
      res.status(500).send(err);
    });
  }
}