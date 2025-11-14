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
  log("Form submission received", {
    hasEnv: !!context.env?.RESEND_API_KEY,
    method: context.request.method,
  });

  const apiKey = context.env?.RESEND_API_KEY;
  if (!apiKey) {
    log("Missing RESEND_API_KEY");
    return jsonResponse(
      {
        success: false,
        error: "Server configuration error - missing API key",
      },
      500
    );
  }

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
    honeypot,
  });

  if (!email || !email.includes("@")) {
    return jsonResponse(
      { success: false, error: "Valid email address is required" },
      400
    );
  }

  if (honeypot) {
    log("Honeypot triggered");
    return jsonResponse({
      success: true,
      message: "Thank you for your interest!",
    });
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
        🎉 New Beta Signup
      </h2>

      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>📧 Email:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px;">${email}</code></p>
        ${name ? `<p><strong>👤 Name:</strong> ${name}</p>` : ""}

        <p><strong>💬 Message:</strong></p>
        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4CAF50;">
          ${
            message
              ? message.replace(/\n/g, "<br>")
              : "<em>No message provided</em>"
          }
        </div>
      </div>

      <div style="border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #666;">
        <p><strong>⏰ Submitted:</strong> ${new Date().toLocaleString("en-AU", {
          timeZone: "Australia/Sydney",
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
        <p><strong>🌐 Source:</strong> www.cuemein.app</p>
      </div>
    </div>
  `;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "CueMeIn Beta <onboarding@resend.dev>",
        to: ["beta@cuemein.com.au"],
        subject: `🎯 New Beta Signup: ${email}`,
        html,
      }),
    });

    const result = await resendResponse.json();
    log("Resend response", {
      status: resendResponse.status,
      ok: resendResponse.ok,
      id: result?.id || result?.data?.id,
      error: result?.error,
    });

    if (!resendResponse.ok || result?.error) {
      const message =
        result?.error?.message ||
        result?.error ||
        "Email service error, please try again.";
      throw new Error(message);
    }

    return jsonResponse({
      success: true,
      message: "Thank you! We'll be in touch soon. 🎉",
      emailId: result?.id || result?.data?.id,
    });
  } catch (error) {
    log("Email send failed", { message: error.message, stack: error.stack });

    if (error.message.includes("API key")) {
      return jsonResponse(
        { success: false, error: "Email service configuration error" },
        500
      );
    }

    if (error.message.includes("fetch")) {
      return jsonResponse(
        { success: false, error: "Network connectivity issue" },
        500
      );
    }

    return jsonResponse(
      { success: false, error: "Failed to process your request. Please try again." },
      500
    );
  }
}
