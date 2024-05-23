"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionDetails, setSessionDetails] = useState<any>({});

  const getSessionId = () => {
    let sessionId = params.get("sessionId");
    if (!sessionId) router.push("/");

    setSessionId(sessionId);
    fetchSessionDetails(sessionId);
  };

  const fetchSessionDetails = async (sessionId: any) => {
    const response = await fetch("/api/payment/check/" + sessionId);
    const json = await response.json();
    if (json.success) {
      setSessionDetails(json.session);
      console.log(json);
    }
  };

  useEffect(() => {
    getSessionId();
  }, []);

  return (
    <div>
      <p>Ödemeniz Başarısız</p>
      {sessionId && <small>Ödeme Kimlik Numarası: {sessionId}</small>}
      {sessionDetails && <p> Ödeme Status: {sessionDetails.status}</p>}
    </div>
  );
}
