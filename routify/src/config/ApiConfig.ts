
import { signIn } from "next-auth/react";
import { transactionType } from "viem";
import { Data } from "@/pages/api/user/signup";
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

export type ProductData = {
    product_name: string;
    product_description:string;
    amount:string;
    product_image:string;
    seller_phonenumber:string,
    token:string
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

  export const CreateProduct = async (transactionDetails: ProductData) => {
    try {
      const res = await fetch("api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           product_name:transactionDetails.product_name,
           amount: transactionDetails.amount,
           product_description:transactionDetails.product_description,
           product_image:transactionDetails.product_image,
           seller_phonenumber:transactionDetails.seller_phonenumber,
           token:transactionDetails.token
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


  