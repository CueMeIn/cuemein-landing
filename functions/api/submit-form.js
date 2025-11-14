export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context) {
  try {
    console.log("[submit-form] Form submission received");

    // Parse request body
    let body;
    try {
      body = await context.request.json();
    } catch (error) {
      console.log("[submit-form] Failed to parse JSON:", error.message);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON payload" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const { email, name, message, honeypot } = body || {};

    console.log("[submit-form] Parsed payload:", {
      hasEmail: !!email,
      emailValid: email?.includes("@"),
      hasName: !!name,
      messageLength: message?.length || 0,
    });

    // Validate email
    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Valid email address is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Honeypot spam protection
    if (honeypot) {
      console.log("[submit-form] Honeypot triggered - spam blocked");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Thank you for your interest!",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Log the successful submission
    console.log("[submit-form] Beta signup recorded:", {
      email: email,
      name: name || "Not provided",
      messagePreview: message?.substring(0, 50) || "No message",
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! We'll be in touch soon. 🎉",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("[submit-form] Unexpected error:", error.message);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error. Please try again.",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
