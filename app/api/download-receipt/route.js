import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const filename = searchParams.get('filename');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Read the SVG files
    const digicraftSvg = await fs.readFile(path.join(process.cwd(), 'public', 'digicraft.svg'), 'utf8');
    const ojassBlackSvg = await fs.readFile(path.join(process.cwd(), 'public', 'ojassblack.png'), 'base64');

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
    const page = await browser.newPage();

    // Generate receipt HTML
    const receiptHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>OJASS Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              position: relative;
              background: white;
              color: #111827;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-12deg);
              opacity: 0.08;
              pointer-events: none;
              width: 600px;
              height: 600px;
              z-index: -1;
            }
            .header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 30px;
              position: relative;
            }
            .header-left {
              display: flex;
              align-items: center;
            }
            .header-logos {
              display: flex;
              align-items: center;
            }
            .header-logos img {
              width: 48px;
              height: 48px;
              object-fit: contain;
            }
            .header-text {
              margin-left: 12px;
            }
            .header-text h1 {
              color: #2563EB;
              font-size: 32px;
              font-weight: bold;
              margin: 0;
            }
            .header-text p {
              color: #4B5563;
              margin: 0;
            }
            .header-right img {
              width: 96px;
              height: 48px;
              object-fit: contain;
            }
            .divider {
              height: 1px;
              background: #E5E7EB;
              margin: 24px 0;
            }
            .title {
              text-align: center;
              font-size: 24px;
              font-weight: 600;
              color: #1F2937;
              margin: 24px 0;
            }
            .receipt-info {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin: 24px 0;
            }
            .receipt-info .label {
              color: #4B5563;
              font-size: 14px;
            }
            .receipt-info .value {
              font-weight: 500;
              color: #111827;
            }
            .details {
              background: #F9FAFB;
              padding: 24px;
              border-radius: 8px;
              margin: 24px 0;
            }
            .details-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              padding: 8px 0;
            }
            .details-row:not(:last-child) {
              border-bottom: 1px solid #E5E7EB;
            }
            .details-label {
              color: #4B5563;
            }
            .details-value {
              text-align: right;
              font-weight: 500;
              color: #111827;
            }
            .payment-status {
              background: #EFF6FF;
              padding: 24px;
              border-radius: 8px;
              border: 1px solid #DBEAFE;
              margin: 24px 0;
            }
            .payment-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }
            .payment-status-text {
              color: #059669;
              font-weight: 500;
            }
            .payment-amount {
              text-align: right;
              color: #2563EB;
              font-size: 24px;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #6B7280;
            }
            .footer p {
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          <img src="data:image/svg+xml;base64,${Buffer.from(digicraftSvg).toString('base64')}" 
               alt="Watermark" 
               class="watermark" />

          <div class="header">
            <div class="header-left">
              <div class="header-logos">
                <img src="data:image/png;base64,${ojassBlackSvg}" 
                     alt="OJASS Black Logo" />
              </div>
              <div class="header-text">
                <h1>OJASS 2025</h1>
                <p>NIT Jamshedpur</p>
              </div>
            </div>
            <div class="header-right">
              <img src="data:image/svg+xml;base64,${Buffer.from(digicraftSvg).toString('base64')}" 
                   alt="DigiCraft Logo" />
            </div>
          </div>

          <div class="divider"></div>

          <h2 class="title">Payment Receipt</h2>

          <div class="receipt-info">
            <div>
              <div class="label">Receipt No:</div>
              <div class="value">${user.payment?.receiptId || 'N/A'}</div>
            </div>
            <div style="text-align: right;">
              <div class="label">Payment Date:</div>
              <div class="value">${new Date(user.payment?.date || user.paymentDate).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</div>
            </div>
          </div>

          <div class="details">
            <div class="details-row">
              <div class="details-label">Participant Name:</div>
              <div class="details-value">${user.name}</div>
            </div>
            <div class="details-row">
              <div class="details-label">OJASS ID:</div>
              <div class="details-value">${user.ojassId}</div>
            </div>
            <div class="details-row">
              <div class="details-label">Email:</div>
              <div class="details-value">${user.email}</div>
            </div>
            <div class="details-row">
              <div class="details-label">Phone:</div>
              <div class="details-value">${user.phone}</div>
            </div>
            <div class="details-row">
              <div class="details-label">College:</div>
              <div class="details-value">${user.college}</div>
            </div>
            <div class="details-row">
              <div class="details-label">Registration Type:</div>
              <div class="details-value">${user.isNitJsr ? 'NIT Jamshedpur Student' : 'Other College Student'}</div>
            </div>
            <div class="details-row" style="border-top: 1px solid #E5E7EB; padding-top: 16px;">
              <div class="details-label">Registration Phase:</div>
              <div class="details-value">${user.registrationPhase}</div>
            </div>
          </div>

          <div class="payment-status">
            <div class="payment-grid">
              <div>
                <div class="label">Payment Status</div>
                <div class="payment-status-text">
                  ${user.payment?.status === 'completed' || user.paid ? 'Paid' : 'Pending'}
                </div>
              </div>
              <div>
                <div class="label" style="text-align: right;">Amount Paid</div>
                <div class="payment-amount">₹${user.payment?.amount || user.paidAmount || 0}</div>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>This is a computer generated receipt and does not require a physical signature.</p>
            <p style="font-size: 11px;">For payment related issues: digicraft.one@gmail.com | +91 8299797516</p>
            <p style="font-size: 10px; margin-top: 8px;">Powered by DigiCraft</p>
          </div>
        </body>
      </html>
    `;

    // Set content and generate PDF
    await page.setContent(receiptHtml);
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    await browser.close();

    // Return PDF with proper headers
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Download receipt error:', error);
    return NextResponse.json(
      { error: 'Failed to generate receipt' },
      { status: 500 }
    );
  }
} 