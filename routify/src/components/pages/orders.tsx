import * as React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Gigs } from "@/helpers/data";
import { Gig } from "@/types/data-type";
import { useQuery } from "@tanstack/react-query";

import { AllPendingGigs } from "@/config/ApiConfig";
import { GigData } from "@/types/data-type";
import Sidebar from "../sidebar";
export default function MarketPlace() {
  const router = useRouter();

  const getTotalTransaction = async () => {
    try{
        const res = await fetch(`api/gigs/pending`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`,
            },
            credentials: "omit",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch properties");
          }
          return await res.json();

    }catch(error){
        console.log("can't load data",error)

    }
    
  };

  
  // const { data: pendingGigs, isLoading, isError } = useQuery<Gig[], Error>({
  //   queryFn: AllPendingGigs,
  //   queryKey: ["pendingGigs"], // Unique key for this query
  // });
  const { data, error:isError, isLoading } = useQuery<any>({
    queryKey: ["marketingg"],
    queryFn: getTotalTransaction,
    // enabled: !!token,
  });

  console.log("data data", data);
  
  const handleTakeClick = (gig: GigData) => {
    const { title, gig_id, price, direction } = gig;
    console.log("direction direct",direction.source.latitude)
    

    // Prepare data object to store in local storage
    const dataToStore = {
        title: title,
        gig_id: gig_id,
        price: price,
        direction: direction.source,
    };

    // Convert data object to string
    const dataString = JSON.stringify(dataToStore);

    // Store data in local storage
    localStorage.setItem('navigationData', dataString);

    // Navigate to the navigation page
    
    router.push("/navigation");
};
if (isLoading) {
  return <div>Loading...</div>;
}

if (isError) {
  return <div>Error fetching data</div>;
}

  return (
    <main className="w-screen h-screen">
       <Sidebar />
      <div className="h-full w-full">
        <ScrollArea className="h-full w-full relative">
          
          <div className="w-full p-4 mt-16">
            {data?.data?.map((item: GigData, index: number) => (
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
                        <span>Description:</span>
                        <span>{item.title}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Duration:</span>
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Price:</span>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-2">
                    <Button onClick={() => handleTakeClick(item)}>TAKE</Button>
                    <Badge variant="outline">{item.status}</Badge>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
}
