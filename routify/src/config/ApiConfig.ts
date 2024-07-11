
import { signIn } from "next-auth/react";
import { transactionType } from "viem";
import { Data } from "@/pages/api/user/signup";
import axios from 'axios'
export type ProductList = {
  
    product_id:string;
    token:string
  };
  
  type ApiResponse = {
    success: boolean;
    message?: string;
    data?: any;
  };



export type dataSignInUser = {
  phoneNumber: string;
  password: string;
};

export type RegisterUser = {
  phoneNumber: string;
  password: string;
  address :`0x${string}` | undefined
};

export type Transaction ={
  transanctiontype:string,
  amount:string,
  month:number,
  token:any
}

export type GigData = {
    user_id: string | undefined;
    title:string;
    price:string;  
    source?: {
      latitude: number | null | undefined |string;
      longitude: number | null | undefined |string;
    }; 
  };
  
//   type ApiResponse = {
//     success: boolean;
//     message?: string;
//     data?: any;
//   };

export const SignInUserr = async (userDetails: dataSignInUser) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        phonenumber: userDetails.phoneNumber,
        password: userDetails.password,
      });
      return res;
    } catch (error) {
      console.log("failed to signinUser", error);
    }
  };
  // {product_name,product_description,amount,product_image}

  export const CreateGig = async (transactionDetails: GigData) => {
    console.log("directions hjgrhjgjhgjhreghjerghrgh",transactionDetails)
    try {
      const res = await fetch("api/gigs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           user_id:transactionDetails.user_id,
           price: transactionDetails.price,
           title:transactionDetails.title,
           source:transactionDetails.source
           
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };


  export const UserSignUp = async (userDetails: Data) => {
    try {
      const res = await fetch("api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phonenumber: userDetails.phonenumber,
          password: userDetails.password,
          username: userDetails.username
      
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };


  export const AllPendingGigs = async () => {
    try {
      const res = await axios.get("/api/gigs/pending", {
        headers: {
          "Content-Type": "application/json",
        },        
      });
      return res.data; // Assuming your API response structure is { success: boolean, data: any }
    } catch (error) {
      console.error("Failed to fetch pending gigs:", error);
      throw new Error("Failed to fetch pending gigs");
    }
  };

  export const AllUserPendingGigs = async () => {
    try {
      const res = await axios.get("/api/gigs/userPending", {
        headers: {
          "Content-Type": "application/json",
        },        
      });
      return res.data; // Assuming your API response structure is { success: boolean, data: any }
    } catch (error) {
      console.error("Failed to fetch pending gigs:", error);
      throw new Error("Failed to fetch pending gigs");
    }
  };



  //

  export const ListProduct = async (transactionDetails: ProductList) => {
    try {
      const res = await fetch("api/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id:transactionDetails.product_id,
           token:transactionDetails.token
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };


  export const BuyProduct = async (transactionDetails: ProductList) => {
    try {
      const res = await fetch("api/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id:transactionDetails.product_id,
           token:transactionDetails.token
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };


  export const ConfirmReceivedProduct = async (transactionDetails: ProductList) => {
    try {
      const res = await fetch("api/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id:transactionDetails.product_id,
           token:transactionDetails.token
        }),
      });
      return res;
    } catch (error) {
      console.log("failed to register", error);
    }
  };


  