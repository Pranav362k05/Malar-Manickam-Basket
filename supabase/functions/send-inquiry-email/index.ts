import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, phone, message } = await req.json();

    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const toEmail = "malarmanickam25@gmail.com";

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailBody = `
New Inquiry - Malar Manickam Plastic Wire Baskets
================================================

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Submitted: ${submittedAt}

Message:
${message}

================================================
To reply, visit your admin dashboard or reply directly to: ${email}
    `.trim();

    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">
  <div style="background: linear-gradient(135deg, #e11d48, #f43f5e); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 22px;">New Inquiry Received</h1>
    <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Malar Manickam Plastic Wire Baskets</p>
  </div>
  <div style="background: #fff9f9; padding: 30px; border: 1px solid #ffe4e6; border-top: none;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 10px 0; color: #9ca3af; width: 100px;">Name</td><td style="padding: 10px 0; font-weight: 600; color: #1f2937;">${name}</td></tr>
      <tr><td style="padding: 10px 0; color: #9ca3af;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #e11d48;">${email}</a></td></tr>
      <tr><td style="padding: 10px 0; color: #9ca3af;">Phone</td><td style="padding: 10px 0; color: #1f2937;">${phone || "Not provided"}</td></tr>
      <tr><td style="padding: 10px 0; color: #9ca3af;">Date</td><td style="padding: 10px 0; color: #6b7280;">${submittedAt}</td></tr>
    </table>
    <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #fecdd3;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
      <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
    </div>
    <div style="margin-top: 24px; text-align: center;">
      <a href="mailto:${email}?subject=Re: Your Inquiry - Malar Manickam Plastic Wire Baskets" style="background: #e11d48; color: white; padding: 12px 24px; border-radius: 25px; text-decoration: none; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
    </div>
  </div>
  <div style="padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
    Malar Manickam Plastic Wire Baskets &bull; Sivagangai, Tamil Nadu
  </div>
</body>
</html>`;

    if (smtpUser && smtpPass) {
      const { createTransport } = await import("npm:nodemailer@6.9.9");
      const transporter = createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"Malar Manickam Baskets" <${smtpUser}>`,
        to: toEmail,
        replyTo: email,
        subject: `New Inquiry from ${name} - Malar Manickam Plastic Wire Baskets`,
        text: emailBody,
        html: htmlBody,
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Inquiry submitted successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to process inquiry" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
