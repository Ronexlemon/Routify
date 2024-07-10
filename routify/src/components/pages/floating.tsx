import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { CreateGig } from '@/config/ApiConfig';
import { useSession } from 'next-auth/react';

const FloatingButtonWithModal: React.FC = () => {
    const {data:session} = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = async() => {
        // Add your submit logic here
        console.log({ title, id, price });
        const res = await CreateGig({title:title,price:price,user_id:session?.user.data.userid,source:{latitude:`-1.286389`,longitude:`36.817223`}}) 
        console.log("the response create is",res)
        toggleModal();
    };

    return (
        <div>
            <div className="fixed bottom-4 right-4">
                <Button
                    onClick={toggleModal}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    +
                </Button>
            </div>

            <AlertDialog open={isModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                        <div className="flex flex-col  mb-10 gap-4">
                            <Input
                                type="text"
                                placeholder="Title"
                                className="w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {/* <Input
                                type="text"
                                placeholder="ID"
                                className="w-full"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            /> */}
                            <Input
                                type="text"
                                placeholder="Price"
                                className="w-full"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter >
                        <div className='flex justify-between items-center w-full'>
                            
                        <Button onClick={toggleModal}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                        

                        </div>
                       
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default FloatingButtonWithModal;
