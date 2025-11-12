import { Request, RequestHandler } from "express";
export interface AuthenticatedRequest extends Request {
    userId?: string;
}
export declare const verifyAuth: RequestHandler;
//# sourceMappingURL=auth.d.ts.map