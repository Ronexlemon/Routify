// AuthPage.tsx
"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { SignInUserr, UserSignUp } from "@/config/ApiConfig"
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";

export function AuthPage() {
  const account = useAccount();
  const { data: session } = useSession();
  
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [username, setUserName] = useState<string>("")
  const handlelogin = async () => {
    console.log("Phone number:", phoneNumber);
    console.log("Password:", password);
    try {
      const res = await SignInUserr({ phoneNumber: `${phoneNumber}`, password: password })
      if (res?.url) {
        router.push("/navigation");
      }
    } catch (error) {
      console.log("error", error)
    }
    setPhoneNumber("");
    setPassword("");
  };

  const handleRegister = async () => {
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    try {
      
        const res = await UserSignUp({ phonenumber: phoneNumber, password: password, username:username });
        if (res?.status === 200) {
          router.push("/");
          console.log("res ponsess",res)
        }
      
    } catch (error) {
      console.log("resgister error", error)
    }
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <div className="w-full h-full  flex justify-center items-center fixed">
        <Tabs defaultValue="login" className="h-3/4 w-[400px]">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="login">LOGIN</TabsTrigger>
            <TabsTrigger value="signup">SIGNUP</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Have an account give it a shot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Phone Number</Label>
                  <Input id="name" type="number" placeholder="0701707772" value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" type="text" placeholder="JohnDoe@#" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlelogin}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Change your password here. After saving, be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Phone Number</Label>
                  <Input id="name" type="number" placeholder="0701707772" value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">User Name</Label>
                  <Input id="name" type="text" placeholder="Doe" value={username}
                    onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input id="username" type="text" placeholder="JohnDoe@#" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="text" placeholder="JohnDoe@#" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleRegister}>Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
