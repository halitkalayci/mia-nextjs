"use client";
import { Button } from "@/components/ui/button";
import { STRIPE_PUBLISH_KEY } from "@/constants/stripe";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function Page() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const pay = async () => {
    const stripe = await loadStripe(STRIPE_PUBLISH_KEY);
    const response = await fetch("/api/payment", { method: "POST" });
    const json: any = await response.json();

    if (json.success) {
      console.log(json);
      // setClientSecret(json.sessionId + "_secret_" + json.client_secret);
      const result = await stripe?.redirectToCheckout({
        sessionId: json.sessionId,
      });
    }
  };
  return (
    <>
      <Button onClick={pay}>Öde</Button>
      <div>
        Homepage Index - Bu sayfayı görüntüleyebiliyorsanız giriş yapmışsınız
        demektir.
        {/* {clientSecret && (
          <PayNow
            title="Click To Pay"
            successMessage="payment done,creating order please wait...."
            stripe={stripe}
            clientSecret={clientSecret}
            onClick={() => {
              // todo: other input field validation (like name,shipping address,etc)
              // todo: create the order and store into database by setting payment-status to pending
              console.log("on click");
            }}
            onPaymentSuccess={() => {
              console.log(
                "wow, payment done. the webhook will be called, so we will update order info in webhook and make the payment-status pending to paid."
              );
            }}
          />
        )} */}
      </div>
    </>
  );
}
