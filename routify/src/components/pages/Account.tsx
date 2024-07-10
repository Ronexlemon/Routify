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
import { Gigs } from "@/helpers/data";
import { Gig } from "@/types/data-type";

const Account: React.FC = () => {
    const router = useRouter();
    return (
        <div className="relative w-full min-h-screen bg-gray-100">
            <Sidebar />
            <div className="h-full w-full">
        <ScrollArea className="h-full w-full relative">
          {/* <div className="flex flex-col absolute bottom-0 right-4 left-4">
            <div className="flex justify-between items-center w-full h-16">
              <Button onClick={() => router.push("/")}>Account</Button>
              <Button className="bg-gray-300" onClick={() => router.push("/market")}>
                Market
              </Button>
              <Button onClick={() => router.push("/delivery")}>Delivery</Button>
              <Button onClick={() => router.push("/sold")}>Sold</Button>
              <Button onClick={() => router.push("/unlisted")}>Unlist</Button>
              <Button onClick={() => router.push("/send")}>Send</Button>
            </div>
          </div> */}

          <div className="w-full p-4 mt-16">
            {Gigs?.map((item: Gig, index: number) => (
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
                        <span>ID:</span>
                        <span>{item.gig_id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Price:</span>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-2">
                    <Button >TAKE</Button>
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
