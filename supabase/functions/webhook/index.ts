
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// This function handles Stripe webhook events
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Stripe signature from the request headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Stripe signature is missing");
    }

    // Get request body as text
    const body = await req.text();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Verify the webhook signature (would use a webhook secret in production)
    // For demo purposes, we're skipping strict signature verification
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        "whsec_dummy_for_development" // In production, use a proper webhook secret
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.user_id;
        const planId = session.metadata?.plan_id;
        
        if (userId && planId) {
          // Update user role based on plan
          const role = planId === "pro" || planId === "ultimate" ? "premium" : "user";
          
          // Delete any existing role entry for this user
          await supabaseClient
            .from("user_roles")
            .delete()
            .eq("user_id", userId);
          
          // Insert new role
          await supabaseClient
            .from("user_roles")
            .insert({ user_id: userId, role });
          
          console.log(`Updated user ${userId} to role ${role}`);
        }
        break;
      }
      
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        if (subscription.status === "active") {
          // Handle subscription update if needed
        }
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        // Get user ID from customer ID (would need a mapping table in production)
        // For now, just log the event
        console.log(`Subscription deleted for customer ${customerId}`);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
