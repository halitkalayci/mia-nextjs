"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Page() {
    const router = useRouter();
    const handleSubmit = async (event:FormEvent) => {
        event.preventDefault();

        // Form elementi içerisindeki verileri formdata'ya aktar.
        const formData = new FormData(event.target as HTMLFormElement);
        // Input'daki name değeri = username olan form verisini verir.
        const username = formData.get('username');
        const password = formData.get('password');

        // fetch API
        // Axios - HttpClient => Kullanılabilir paketler.
        const response = await fetch('/api/login', { method:'POST', body: JSON.stringify({username,password}) });
        const responseAsJson = await response.json();

        if(responseAsJson.success)
        {
            // Kullanıcı girişi başarılı, kullanıcıyı ana sayfaya yönlendir.
            router.push('/');
        }else{
            alert("Şifre ya da kullanıcı adı hatalı.");
        }
    }


    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
           <p> Login Page</p>
           <form onSubmit={handleSubmit} >
                <div className="flex flex-col">
                    <label>Username</label>
                    <input className="shadow appearance-none border rounded" type="text" name="username" />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input className="shadow appearance-none border rounded" type="password" name="password" />
                </div>
                <button type="submit" className="bg-blue-500 rounded text-white w-full p-3">Giriş Yap</button>
           </form>
        </div>
    );
}