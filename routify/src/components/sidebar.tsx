import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/router";
import { Input } from './ui/input';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"

  

const Sidebar: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [draweropen,setDrawerOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className='w-full  '>

<div className=' '>
            <Drawer   open={draweropen}>
  
  <DrawerContent className='w-full flex justify-center items-center h-screen '>
    <DrawerHeader>
      <DrawerTitle>Make Someone Smile ☺️</DrawerTitle>
     
    </DrawerHeader>
    <Card className="w-[400px] bg-black ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
       
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name " className='text-gray-100'>Phone Number</Label>
              <Input  placeholder="254701707772" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name " className='text-gray-100'>Amount</Label>
              <Input  placeholder="$1" />
            </div>
            
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className='bg-green-300 w-full'>SEND</Button>
        
      </CardFooter>
    </Card>
    
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button onClick={()=> setDrawerOpen(false)} variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

            </div>
            <button onClick={toggleSidebar} className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md z-50">
                Menu
            </button>
            
            
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 z-40`}
            >
                <h2 className="text-xl mb-4">Sidebar</h2>
                <ul className="flex flex-col gap-8">
                    <li className="mb-2">
                        <Button onClick={()=>router.push("/account")} className="w-full">Accounts</Button>
                    </li>
                    <li>
                        <Button onClick={()=>router.push("/setting")} className="w-full">Settings</Button>
                    </li>
                    <li>
                        <Button onClick={()=>router.push("/market")} className="w-full">Orders</Button>
                    </li>
                    <li>
                        <Button onClick={()=> setDrawerOpen(true)}  className="w-full">TIP</Button>
                    </li>
                </ul>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClickOutside(event.nativeEvent)}
                />
            )}
        </div>
    );
};

export default Sidebar;
