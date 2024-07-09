import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'; // Correct import statement
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Map from '@/components/map';
import { AuthPage } from '@/components/pages/AuthPage';
// Call Inter font loader with subsets at the module scope
const inter = Inter({ subsets: ['latin'] });

const Home: React.FC = () => {
  
  return (
    <main className={`flex min-h-screen w-full flex-col items-center justify-between  ${inter.className}`}>
      
      <AuthPage/>
    </main>
  );
};

export default Home;
