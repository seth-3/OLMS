declare module 'express' {
  export interface Request {
    headers: any;
    query: any;
    body: any;
    params: any;
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
    get(path: string, handler: (req: Request, res: Response) => void): void;
    post(path: string, handler: (req: Request, res: Response) => void): void;
    put(path: string, handler: (req: Request, res: Response) => void): void;
    delete(path: string, handler: (req: Request, res: Response) => void): void;
    listen(port: number, callback?: () => void): void;
    static(path: string): void;
  }
  
  const express: () => Application;
  export = express;
}

declare module 'cors' {
  const cors: () => (req: any, res: any, next: any) => void;
  export = cors;
}

declare module 'jsonwebtoken' {
  export function verify(token: string, secret: string): any;
  export function sign(payload: any, secret: string): string;
}

declare module 'bcryptjs' {
  export function compare(password: string, hash: string): Promise<boolean>;
  export function hash(password: string, salt: number): Promise<string>;
}
