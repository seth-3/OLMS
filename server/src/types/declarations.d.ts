declare module 'express' {
  export interface Request {
    headers: any;
    query: any;
    body: any;
    params: any;
    method: string;
    path: string;
    url: string;
  }
  
  export interface Response {
    json(data: any): Response;
    status(code: number): Response;
    sendFile(path: string): Response;
  }
  
  export interface NextFunction {
    (): void;
  }
  
  export interface Application {
    use(middleware: any): void;
    use(path: string, middleware: any): void;
    get(path: string, ...handlers: any[]): void;
    post(path: string, ...handlers: any[]): void;
    put(path: string, ...handlers: any[]): void;
    delete(path: string, ...handlers: any[]): void;
    listen(port: number, callback?: () => void): void;
    static(path: string): void;
  }
  
  export interface Router {
    use(middleware: any): void;
    get(path: string, ...handlers: any[]): void;
    post(path: string, ...handlers: any[]): void;
    put(path: string, ...handlers: any[]): void;
    delete(path: string, ...handlers: any[]): void;
  }
  
  interface Express {
    (): Application;
    json(options?: any): any;
    urlencoded(options?: any): any;
    static(path: string): any;
  }
  
  interface CorsOptions {
    origin?: string | string[];
    credentials?: boolean;
  }
  
  const express: Express;
  const Router: () => Router;
  const cors: (options?: CorsOptions) => any;
  
  export { express, Router, cors };
  export default express;
  export type Express = Application;
}

declare module 'jsonwebtoken' {
  export function verify(token: string, secret: string): any;
  export function sign(payload: any, secret: string, options?: any): string;
}

declare module 'bcryptjs' {
  export function compare(password: string, hash: string): Promise<boolean>;
  export function hash(password: string, salt: string | number): Promise<string>;
  export function genSalt(rounds?: number): Promise<string>;
}
