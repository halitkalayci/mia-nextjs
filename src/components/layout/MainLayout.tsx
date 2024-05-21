"use client"
import React from 'react'
import Navbar from '../navbar/Navbar'
import { usePathname, useRouter } from 'next/navigation';

export default function MainLayout( {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }> ) {
    const path = usePathname();
    console.log(path);

    const NO_NAVBAR_ROUTES= ['/auth/login', '/auth/register']
  return (
    <>
    {!NO_NAVBAR_ROUTES.includes(path) && <Navbar/>}
    {children}
    </>
  )
}
