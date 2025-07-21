// api/submit-form.js - Vercel Serverless Function
const { Resend } = require("resend");

module.exports = async function handler(req, res) {
  // Ensure JSON response
  res.setHeader("Content-Type", "application/json");

  // Form submission received log
  console.log("Form submission received:", {
    method: req.method,
    hasApiKey: !!process.env.RESEND_API_KEY,
    bodyKeys: Object.keys(req.body || {}),
    userAgent: req.headers["user-agent"],
  });

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS request (preflight)
  if (req.method === "OPTIONS") {
    console.log("OPTIONS request handled");
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    // Check environment variables
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        "Critical: RESEND_API_KEY not found in environment variables"
      );
      console.log(
        "Available env vars:",
        Object.keys(process.env).filter(
          (key) => key.includes("RESEND") || key.includes("API")
        )
      );
      return res.status(500).json({
        success: false,
        error: "Server configuration error - missing API key",
      });
    }
    console.log("API key found, length:", apiKey.length);

    // Parse and validate request data
    const { email, name, message, honeypot } = req.body || {};
    console.log("Parsed request data:", {
      hasEmail: !!email,
      emailValid: email?.includes("@"),
      hasName: !!name,
      messageLength: message?.length || 0,
      honeypotValue: honeypot,
    });

    // Input validation
    if (!email || !email.includes("@")) {
      console.log("Invalid email provided:", email);
      return res.status(400).json({
        success: false,
        error: "Valid email address is required",
      });
    }

    // Spam prevention (honeypot check)
    if (honeypot) {
      console.log("Spam attempt blocked (honeypot triggered)");
      return res.status(200).json({
        success: true,
        message: "Thank you for your interest!",
      });
    }

    // Initialise Resend client
    console.log("Initialising Resend client...");
    const resend = new Resend(apiKey);

    // Prepare email data
    const emailData = {
      from: "CueMeIn Beta <noreply@cuemein.app>",
      to: ["beta@cuemein.com.au"],
      subject: `🎯 New Beta Signup: ${email}`,
      html: `
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
            <p><strong>⏰ Submitted:</strong> ${new Date().toLocaleString(
              "en-AU",
              {
                timeZone: "Australia/Sydney",
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</p>
            <p><strong>🌐 Source:</strong> www.cuemein.app</p>
          </div>
        </div>
      `,
    };

    console.log("Sending email with data:", {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
    });

    // Attempt to send email
    const emailResult = await resend.emails.send(emailData);

    console.log("Email sent successfully:", {
      id: emailResult.data?.id,
      error: emailResult.error,
    });

    if (emailResult.error) {
      throw new Error(`Resend API error: ${JSON.stringify(emailResult.error)}`);
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Thank you! We'll be in touch soon. 🎉",
      emailId: emailResult.data?.id,
    });
  } catch (error) {
    // Detailed error logging
    console.error("Email sending failed with detailed error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });

    // Specific error type handling
    if (error.message.includes("API key")) {
      return res.status(500).json({
        success: false,
        error: "Email service configuration error",
      });
    }

    if (error.message.includes("fetch")) {
      return res.status(500).json({
        success: false,
        error: "Network connectivity issue",
      });
    }

    // General server error
    return res.status(500).json({
      success: false,
      error: "Failed to process your request. Please try again.",
    });
  }
};
