import { hookSecret } from "@/lib/env.api";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    // If hookSecret is not set, return a 200 response but log a warning
    if (!hookSecret) {
      console.warn("Webhook secret is not set, skipping validation");
      const body = await req.json();
      
      if (!body?._type) {
        return new Response("Bad Request", { status: 400 });
      }
      
      revalidateTag(body._type);
      return NextResponse.json({
        status: 200,
        revalidated: true,
        now: Date.now(),
        body,
      });
    }

    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, hookSecret);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
