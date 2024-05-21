import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

// Tüm uygulamada auth işlemlerini ortak bir fonk. kullanmak için.
export function useAuth() {
  // Eğer işlemler client-side olsa idi cookieden jwt okuma için `Universal-Cookie` paketi gerekir idi.

  // JWT doğrula, çözümle => Server Side => Daha güvenli.

  // Bir API endpoint ile jwt'i cookieden oku, doğrula ve geçerli ise jwt bilgilerini decode olarak gönder.

  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getVerifiedToken();
  }, []);

  // API endpointine istek atıp auth durumunu set edecek.
  const getVerifiedToken = async () => {
    try {
      const response = await fetch("/api/verify-jwt", { method: "POST" });
      const responseAsJson = await response.json();

      if (responseAsJson.success) setAuth(responseAsJson.payload);
      else setAuth(null);
    } catch (error) {
      setAuth(null);
    } finally {
      setLoading(false);
    }
  };

  return { auth, loading };
}
