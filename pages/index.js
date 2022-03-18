import React, {  useEffect } from 'react';
import { useAuth } from '../auth';
import { useRouter } from "next/router";
import Index from '../components/Index';


export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (user) {
          router.push("/chat")
      }
      if (user == false) {
          router.push("/")
      }
  }, [user]);
  
  return ( 
      <> {user || user == null ? (<></>) : ( <Index></Index>)} </> 
  );
}
