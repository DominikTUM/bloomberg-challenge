declare module 'common' {
  export interface AuthorizedUser {
      _id: string;
   }
}

declare namespace Express {
    export interface Request {
       user?: AuthorizedUser
    }
 }