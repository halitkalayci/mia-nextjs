import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
    const session = await stripe.checkout.sessions.create({
      currency: "usd",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 5000,
            product_data: { name: "tişört" },
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      ui_mode: "embedded",
      redirect_on_completion: "never",
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      ...session,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error });
  }
}
