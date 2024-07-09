import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FloatingButtonWithModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg max-w-md w-full">
                        <Card>
                            <CardHeader className="p-2">
                                <CardTitle>Order Item</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-1 p-2">
                                <p>What would you like to order?</p>
                                {/* Add your form inputs here */}
                            </CardContent>
                            <CardFooter className="flex justify-end p-2">
                                <Button onClick={toggleModal} className="mr-2">Cancel</Button>
                                <Button>Order</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingButtonWithModal;
