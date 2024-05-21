"use client"
import React from 'react'
import Navbar from '../navbar/Navbar'
import { usePathname, useRouter } from 'next/navigation';

export default function MainLayout( {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }> ) {
    // URL'in path kısmını al.
    const path = usePathname();

    // Navbarın gözükmesini istemediğimiz url listesi.
    const NO_NAVBAR_ROUTES= ['/auth/login', '/auth/register']
  return (
    <>
    {!NO_NAVBAR_ROUTES.includes(path) && <Navbar/>}
    {children}
    </>
  )
}
