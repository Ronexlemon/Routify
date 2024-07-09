import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Button } from './ui/button';
import { useRouter } from "next/router";
interface MapProps {
  origin?: google.maps.LatLngLiteral; // Make origin optional
  destination?: google.maps.LatLngLiteral; // Make destination optional
  location?: google.maps.LatLngLiteral; // Make location optional
}

const Map: React.FC<MapProps> = ({ origin, destination, location }) => {
  const router = useRouter();
 
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const directionsCallback = (response: google.maps.DirectionsResult | null) => {
    if (response) {
      setDirections(response);
    } else {
      console.error('Directions request failed');
    }
  };

  const center = location ?? origin ?? destination ?? { lat: 0, lng: 0 };

  return (
    <div className='w-full relative'>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={14}
          center={center} // Use center here instead of location
        >
          {origin && destination && (
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: 'DRIVING' as google.maps.TravelMode,
              }}
              callback={directionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
              }}
            />
          )}
          {location && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>
      <Button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
        onClick={() => router.push("/market")}
      >
        GIGS
      </Button>
    </div>
  );
};

export default Map;
