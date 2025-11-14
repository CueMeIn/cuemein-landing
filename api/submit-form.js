const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: JSON_HEADERS });
}

export async function onRequestPost(context) {
  const log = (...args) => console.log("[submit-form]", ...args);
  
  try {
    log("Form submission received");

    // Parse request body
    let body;
    try {
      body = await context.request.json();
    } catch (error) {
      log("Failed to parse JSON body", error);
      return jsonResponse(
        { success: false, error: "Invalid JSON payload" },
        400
      );
    }

    const { email, name, message, honeypot } = body || {};
    
    log("Parsed payload", {
      hasEmail: !!email,
      emailValid: email?.includes("@"),
      hasName: !!name,
      messageLength: message?.length || 0,
      honeypot: !!honeypot,
    });

    // Basic validation
    if (!email || !email.includes("@")) {
      return jsonResponse(
        { success: false, error: "Valid email address is required" },
        400
      );
    }

    // Honeypot check
    if (honeypot) {
      log("Honeypot triggered - spam blocked");
      return jsonResponse({
        success: true,
        message: "Thank you for your interest!",
      });
    }

    // For now, just log and return success
    log("Beta signup recorded:", { email, name, message });
    
    return jsonResponse({
      success: true,
      message: "Thank you! We'll be in touch soon.",
      debug: {
        email: email,
        name: name || "Not provided",
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    log("Unexpected error:", error.message, error.stack);
    return jsonResponse(
      { 
        success: false, 
        error: "Internal server error",
        debug: error.message
      },
      500
    );
  }
}
