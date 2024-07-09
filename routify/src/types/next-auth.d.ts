import NextAuth from "next-auth";
import { JwtPayload } from "next-auth/jwt";
declare module "next-auth"{
    interface Session{
        user: {
          data:{
            userid: string;            
            phonenumber: string;            
            name: number;            
            role:string
          }      
          success: boolean;
          iat: number,
    exp: number,
    jti: string
         

          },
         
            
          
        }
    }


    // Define the interface for the token obtained from getToken
export interface TokenPayload extends JwtPayload {
  
    data:{
      userid: string;            
      phonenumber: string;            
      name: number;            
      role:string
      }    
    
      success: boolean;
      iat: number,
      exp: number,
      jti: string
   
      
    
  
}