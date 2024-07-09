import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'; // Correct import statement
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Map from '@/components/map';
import { AuthPage } from '@/components/pages/AuthPage';
import MapNavigation from '@/components/pages/mapinput';
//import { useRouter } from "next/router";

// Call Inter font loader with subsets at the module scope
const inter = Inter({ subsets: ['latin'] });

const Home: React.FC = () => {
//     const router = useRouter();
//   const { title, id, price } = router.query;
    
  
  return (
    <main className={`flex min-h-screen w-full flex-col items-center justify-between  ${inter.className}`}>
        
        {/* <div className='text-blue-400'>
      <h1>Navigation Page</h1>
      <p>Title: {title}</p>
      <p>ID: {id}</p>
      <p>Price: {price}</p>
      </div> */}
      <MapNavigation/>
    </main>
  );
};

export default Home;
