import { datoError } from "lib/dato";

export default function catchErrorsFrom(handler) {
  return async (req, res) => {
    return handler(req, res)
      .catch((error) => {
        const err = datoError(error)
        return res.status(500).send(err);
      });
  }
}