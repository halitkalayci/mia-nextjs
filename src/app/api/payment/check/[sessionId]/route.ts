import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
  const session = await stripe.checkout.sessions.retrieve(params.sessionId);

  return NextResponse.json({ success: true, session: { ...session } });
}
