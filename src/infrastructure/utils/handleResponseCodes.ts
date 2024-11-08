import { Response } from "express";
interface IError {
  code?: number;
  error?:string|object|unknown
  
}
export function sendErrorResponse(res: Response, code: number, errObj: IError) {
  return res.status(code).json({ error: { code, error: errObj.code } });
}

export function sendSuccessResponse(res: Response, code: number, data: object) {
  return res.status(code).json({ ...data });
}
