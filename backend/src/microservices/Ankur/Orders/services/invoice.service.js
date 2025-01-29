const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class InvoiceService {
  constructor() {
    this.logoPath = path.join(__dirname, 'logo.jpg'); // Ensure the logo is in the same folder
    this.styles = {
      fonts: {
        header: 18,
        subHeader: 12,
        normal: 10,
        small: 8
      },
      padding: 10,
      boxMargin: 5
    };
  }

  drawBox(doc, x, y, width, height, title = '') {
    doc.rect(x, y, width, height).stroke(); // Draw the box border
    if (title) {
      doc.fontSize(this.styles.fonts.subHeader)
         .text(title, x + this.styles.padding, y + this.styles.padding, { align: 'left', width: width - 20 });
    }
  }

  async generateInvoice(data, outputPath) {
    const doc = new PDFDocument({ margin: 40 });
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Main border
    this.drawBox(doc, 40, 40, 515, 750);

    // Add sections
    this.addHeader(doc);
    this.addInvoiceDetails(doc, data);
    this.addCompanyDetails(doc, data);
    this.addItemsTable(doc, data);
    this.addTotals(doc, data);
    this.addFooter(doc);

    doc.end();

    return new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  }

  addHeader(doc) {
    this.drawBox(doc, 40, 40, 300, 80); // Header box
    if (fs.existsSync(this.logoPath)) {
      doc.image(this.logoPath, 50, 50, { width: 45 })
         .fontSize(this.styles.fonts.header)
         .text('CrossWave', 105, 55, { align: 'left' })
         .fontSize(9)
         .text('TRADING WITH TRUST', 105, 75, { align: 'left' });
    }
  }

  addInvoiceDetails(doc, data) {
    this.drawBox(doc, 350, 40, 205, 80, 'INVOICE');
    doc.fontSize(this.styles.fonts.normal)
       .text(`Invoice No: ${data.invoiceNumber}`, 360, 70, { align: 'left' })
       .text(`Date: ${new Date().toLocaleDateString()}`, 360, 85, { align: 'left' })
       .text(`Due Date: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`, 360, 100, { align: 'left' });
  }

  addCompanyDetails(doc, data) {
    const startY = 130;
    const boxHeight = 120;

    // Seller box
    this.drawBox(doc, 40, startY, 250, boxHeight, 'FROM');
    doc.fontSize(this.styles.fonts.normal)
       .text(data.seller.name, 50, startY + 30, { align: 'left' })
       .text(data.seller.address, 50, startY + 45, { align: 'left' })
       .text(`${data.seller.city}, ${data.seller.country}`, 50, startY + 60, { align: 'left' })
       .text(`Phone: ${data.seller.phone}`, 50, startY + 75, { align: 'left' })
       .text(`Tax ID: ${data.seller.taxId}`, 50, startY + 90, { align: 'left' });

    // Buyer box
    this.drawBox(doc, 305, startY, 250, boxHeight, 'BILL TO');
    doc.fontSize(this.styles.fonts.normal)
       .text(data.buyer.name, 315, startY + 30, { align: 'left' })
       .text(data.buyer.address, 315, startY + 45, { align: 'left' })
       .text(`${data.buyer.city}, ${data.buyer.country}`, 315, startY + 60, { align: 'left' })
       .text(`Phone: ${data.buyer.phone}`, 315, startY + 75, { align: 'left' })
       .text(`Tax ID: ${data.buyer.taxId}`, 315, startY + 90, { align: 'left' });
  }

  addItemsTable(doc, data) {
    const tableTop = 260;
    this.drawBox(doc, 40, tableTop, 515, 270, 'ITEMS');

    // Table headers
    const headers = ['No.', 'Description', 'HSN', 'Qty', 'Rate (USD)', 'Amount (USD)'];
    const colWidths = [40, 175, 70, 50, 85, 85];
    let xPos = 50;

    headers.forEach((header, i) => {
      doc.fontSize(this.styles.fonts.normal)
         .text(header, xPos, tableTop + 30, { align: 'left' });
      xPos += colWidths[i];
    });

    doc.moveTo(40, tableTop + 45).lineTo(555, tableTop + 45).stroke(); // Header separator

    // Add items
    let yPos = tableTop + 55;
    data.items.forEach((item, index) => {
      const amount = item.quantity * item.price;
      xPos = 50;

      if (index % 2 === 0) {
        doc.rect(41, yPos - 5, 513, 20).fill('#f9f9f9').stroke(); // Alternate row background
      }

      doc.fillColor('#000000')
         .text(index + 1, xPos, yPos)
         .text(item.description, xPos + colWidths[0], yPos)
         .text(item.hsCode || '-', xPos + colWidths[0] + colWidths[1], yPos)
         .text(item.quantity, xPos + colWidths[0] + colWidths[1] + colWidths[2], yPos)
         .text(item.price.toFixed(2), xPos + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], yPos)
         .text(amount.toFixed(2), xPos + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + colWidths[4], yPos);
      yPos += 20;
    });
  }

  addTotals(doc, data) {
    const startY = 540;
    this.drawBox(doc, 300, startY, 205, 120, 'SUMMARY');

    const totals = [
      { label: 'Sub Total:', value: data.subtotal },
      { label: 'Customs Duty (5%):', value: data.customsDuty },
      { label: 'Import Fees:', value: data.importFees },
      { label: 'Total Amount:', value: data.totalAmount, isBold: true }
    ];

    let yPos = startY + 30;
    totals.forEach(item => {
      doc.fontSize(item.isBold ? this.styles.fonts.subHeader : this.styles.fonts.normal)
         .text(item.label, 300, yPos, { align: 'left' })
         .text(`USD ${item.value.toFixed(2)}`, 420, yPos, { align: 'middle' });
      yPos += 15;
    });
  }

  addFooter(doc) {
    const footerY = 670;

    // Terms
    this.drawBox(doc, 40, footerY, 300, 120, 'Terms & Conditions');
    doc.fontSize(this.styles.fonts.small)
       .text('1. Payment to be made within 30 days.', 50, footerY + 30)
       .text('2. International shipping terms apply.', 50, footerY + 45)
       .text('3. Exchange rates may vary.', 50, footerY + 60);

    // Authorization
    this.drawBox(doc, 350, footerY, 205, 120, 'Authorization');
    doc.fontSize(this.styles.fonts.normal)
       .text('For CrossWave', 360, footerY + 50)
       .text('Authorized Signatory', 360, footerY + 90);
  }
}

module.exports = InvoiceService;
