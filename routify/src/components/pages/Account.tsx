import React from 'react';
import Sidebar from '../sidebar';
import FloatingButtonWithModal from './floating';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from 'next-auth/react';
import { Gig } from '@/types/data-type';

const Account: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user_id = session?.user.data.userid;
  console.log("user id from session",user_id)

  const getTotalTransaction = async () => {
   

    try {
      const res = await fetch(`/api/gigs/pendinguser?user_id=${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }

      return await res.json();
    } catch (error) {
      console.log("can't load data", error);
      return { data: [] }; // Return an empty array in case of an error
    }
  };

  const { data, error: isError, isLoading } = useQuery<any>({
    queryKey: ["userPendingGigs"],
    queryFn: getTotalTransaction,
    enabled: !!user_id
  });

  console.log("data data", data);

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <Sidebar />
      <div className="h-full w-full">
        <ScrollArea className="h-full w-full relative">
          <div className="w-full p-4 mt-16">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error loading data</div>}
            {data?.data?.map((item: Gig, index: number) => (
              <Card key={item.gig_id} className="flex items-center gap-4 mb-4 p-2">
                <Image
                  className="rounded-full"
                  src="/logo.svg" // Replace with the actual image source
                  width={48}
                  height={48}
                  alt="Gig Logo"
                />
                <div className="flex flex-col w-full">
                  <CardHeader className="p-2">
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 p-2">
                    <div className="flex flex-col">
                     
                      <div className="flex justify-between items-center">
                        <span>Price:</span>
                        <span>{item.price}</span>
                        <span>Duration:</span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-2">
                    <Badge variant="outline">{item.status}</Badge>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <FloatingButtonWithModal />
    </div>
  );
};

export default Account;
