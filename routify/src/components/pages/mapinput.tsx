import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Map from '@/components/map';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Direction, Gig } from '@/types/data-type';

const MapNavigation: React.FC = () => {
    const router = useRouter();
    const { title, id, price } = router.query;

    const [sourcee, setSource] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [originCoords, setOriginCoords] = useState<google.maps.LatLngLiteral | undefined>(undefined);
    const [destinationCoords, setDestinationCoords] = useState<google.maps.LatLngLiteral | undefined>(undefined);
    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>();
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const [gigInfo, setGigInfo] = useState<Gig | null>(null);
    const [showMap, setShowMap] = useState<boolean>(false); // State to track if map should be shown

    // Function to fetch coordinates from Google Geocoding API
    const fetchCoordinates = async (address: string, type: 'origin' | 'destination') => {
        try {
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                if (type === 'origin') {
                    setOriginCoords({ lat, lng });
                    setMapCenter({ lat, lng }); // Center map on origin coordinates
                } else if (type === 'destination') {
                    setDestinationCoords({ lat, lng });
                    setShowMap(true); // Show map once destination coordinates are set
                }
            } else {
                throw new Error('No results found for the address');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };

    // Function to handle form submission
    const handleSubmit = () => {
        if (sourcee && destination) {
            fetchCoordinates(destination, 'destination');
        }
    };

    // Function to handle cancelling
    const handleCancel = () => {
        // Implement cancellation logic here
        console.log('Cancelled');
    };

    useEffect(() => {
        // Geolocation logic to watch position and set originCoords
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser.');
            return;
        }
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setOriginCoords({ lat: latitude, lng: longitude });
                setMapCenter({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error updating location:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    useEffect(() => {
        // Retrieve and set gigInfo from localStorage on component mount
        const dataString = localStorage.getItem('navigationData');
        if (dataString) {
            const storedGigInfo: Gig = JSON.parse(dataString);
            setGigInfo(storedGigInfo);

            // Example: Set destination coordinates from direction object
            if (storedGigInfo.direction && storedGigInfo.direction.destination && storedGigInfo.direction.destination.latitude && storedGigInfo.direction.destination.longitude) {
                setDestinationCoords({
                    lat: storedGigInfo.direction.destination.latitude,
                    lng: storedGigInfo.direction.destination.longitude
                });
                setShowMap(true); // Show map if destination coordinates exist
            } else {
                console.error('Invalid direction data in local storage');
            }
        } else {
            console.error('No navigation data found in local storage');
        }
    }, []);

    return (
        <div className="bg-black w-screen h-screen flex justify-center items-center">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1>Delivery App Map</h1>
                <div className="flex flex-col w-full">
                    <Card className="w-full  max-w-md">
                        <CardHeader className="p-2">
                            <CardTitle>{gigInfo?.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 p-2">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center">
                                    <span>Description:</span>
                                    <span>{gigInfo?.title}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>ID:</span>
                                    <span>{gigInfo?.gig_id}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Price:</span>
                                    <span>{gigInfo?.price}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between  items-center p-2">
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleCancel}>End</Button>
                        </CardFooter>
                    </Card>
                </div>
                {/* <div className="mb-10 gap-2">
                    <Input
                        type="text"
                        placeholder="Destination"
                        className="w-full"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </div> */}
                <div className="w-full mx-2 md:w-5/6 h-3/4">
                    {destinationCoords ? (
                        <Map origin={originCoords} destination={destinationCoords} location={mapCenter} />
                    ) : (
                        <p className="text-white">Pick a location to display the map.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapNavigation;
