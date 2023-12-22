import mongoose from 'mongoose';
import { clerkClient } from '@clerk/nextjs/server';
import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';

import {User} from "../../../../lib/models/user.model"

const webhookSecret = process.env.WEBHOOK_SECRET || '';

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, ...attributes } = evt.data;

    try {
      // Upsert the user data using Mongoose
      await User.findOneAndUpdate(
        { externalId: id as string },
        {
          externalId: id as string,
          attributes,
        },
        { upsert: true }
      );
    } catch (error) {
      console.error('Error upserting user:', error);
      return NextResponse.json({}, { status: 500 });
    }
  }

  return NextResponse.json({}, { status: 200 });
}

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;


// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'

// export async function POST(req: Request) {

//    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
//    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

//    if (!WEBHOOK_SECRET) {
//       throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
//    }

//    // Get the headers
//    const headerPayload = headers();
//    const svix_id = headerPayload.get("svix-id");
//    const svix_timestamp = headerPayload.get("svix-timestamp");
//    const svix_signature = headerPayload.get("svix-signature");

//    // If there are no headers, error out
//    if (!svix_id || !svix_timestamp || !svix_signature) {
//       return new Response('Error occured -- no svix headers', {
//          status: 400
//       })
//    }

//    // Get the body
//    const payload = await req.json()
//    const body = JSON.stringify(payload);

//    // Create a new Svix instance with your secret.
//    const wh = new Webhook(WEBHOOK_SECRET);

//    let evt: WebhookEvent

//    // Verify the payload with the headers
//    try {
//       evt = wh.verify(body, {
//          "svix-id": svix_id,
//          "svix-timestamp": svix_timestamp,
//          "svix-signature": svix_signature,
//       }) as WebhookEvent
//    } catch (err) {
//       console.error('Error verifying webhook:', err);
//       return new Response('Error occured', {
//          status: 400
//       })
//    }

//    // Get the ID and type
//    const { id } = evt.data;
//    const eventType = evt.type;

//    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
//    console.log('Webhook body:', body)

//    return new Response('', { status: 200 })
// }
