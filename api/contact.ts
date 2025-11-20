import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  firmName: string;
  contactName: string;
  email: string;
  interest: string;
  message: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData: ContactFormData = req.body;

    // Validate required fields
    if (!formData.firmName || !formData.contactName || !formData.email || !formData.interest) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Email service not configured. Please contact support.'
      });
    }

    // Format the email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: #f59e0b; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #475569; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
            .value { margin-top: 5px; padding: 12px; background: white; border-left: 3px solid #f59e0b; border-radius: 4px; }
            .footer { background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; color: #cbd5e1;">Strapped AI - Consultation Request</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Firm Name</div>
                <div class="value">${formData.firmName}</div>
              </div>
              <div class="field">
                <div class="label">Contact Name</div>
                <div class="value">${formData.contactName}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${formData.email}" style="color: #f59e0b; text-decoration: none;">${formData.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Primary Interest</div>
                <div class="value">${formData.interest}</div>
              </div>
              ${formData.message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p style="margin: 0;">Strapped AI - Enterprise Legal AI Solutions</p>
              <p style="margin: 10px 0 0 0;">Submitted on ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/New_York',
                dateStyle: 'full',
                timeStyle: 'long'
              })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission - Strapped AI

Firm Name: ${formData.firmName}
Contact Name: ${formData.contactName}
Email: ${formData.email}
Primary Interest: ${formData.interest}
${formData.message ? `\nMessage:\n${formData.message}` : ''}

Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
    `;

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Strapped AI <noreply@strappedai.com>',
        to: ['admin@strappedai.com'],
        subject: `New Consultation Request from ${formData.firmName}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', response.status, errorText);
      return res.status(500).json({ 
        error: 'Failed to send email',
        details: errorText 
      });
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);

    return res.status(200).json({ 
      success: true,
      message: 'Contact form submitted successfully',
      emailId: data.id
    });

  } catch (error) {
    console.error("Error in contact API:", error);
    return res.status(500).json({ 
      error: "An error occurred while processing your request.",
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
