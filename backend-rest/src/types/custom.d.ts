declare module 'common' {
  export interface AuthorizedUser {
      id: number;
      email: string;
      name: string;
      role: string;
   }
}

declare namespace Express {
    export interface Request {
       user?: AuthorizedUser
    }
 }