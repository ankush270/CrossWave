const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a function to generate the invoice
function generateInvoice(invoiceData, filePath) {
    const doc = new PDFDocument();

    // Save the PDF to the specified file path
    doc.pipe(fs.createWriteStream(filePath));

    // Header
    doc.fontSize(20).text('CrossWave - Invoice', { align: 'center' });
    doc.moveDown();

    // Invoice Details
    doc.fontSize(12).text(`Invoice #: ${invoiceData.invoiceNumber}`);
    doc.text(`Invoice Date: ${invoiceData.invoiceDate}`);
    doc.text(`Due Date: ${invoiceData.dueDate}`);
    doc.moveDown();

    // Buyer Information
    doc.text('Buyer Information:', { underline: true });
    doc.text(`Name: ${invoiceData.buyer.name}`);
    doc.text(`Address: ${invoiceData.buyer.address}`);
    doc.text(`Phone: ${invoiceData.buyer.phone}`);
    doc.text(`Email: ${invoiceData.buyer.email}`);
    doc.moveDown();

    // Seller Information
    doc.text('Seller Information:', { underline: true });
    doc.text(`Company Name: ${invoiceData.seller.companyName}`);
    doc.text(`Address: ${invoiceData.seller.address}`);
    doc.text(`Phone: ${invoiceData.seller.phone}`);
    doc.text(`Email: ${invoiceData.seller.email}`);
    doc.moveDown();

    // Table Header
    doc.text('Transaction Details:', { underline: true });
    doc.moveDown();
    doc.text(
        `Description                 Quantity       Unit Price       Total`,
        { width: 500 }
    );
    doc.moveDown();

    // Add each transaction item
    invoiceData.items.forEach((item) => {
        doc.text(
            `${item.description.padEnd(25)} ${item.quantity.toString().padEnd(10)} ${item.unitPrice.toString().padEnd(15)} ${item.total}`
        );
    });
    doc.moveDown();

    // Summary
    doc.text(`Subtotal: ${invoiceData.subtotal}`);
    doc.text(`Tax: ${invoiceData.tax}`);
    doc.text(`Total: ${invoiceData.total}`);
    doc.moveDown();

    // Footer
    doc.text('Thank you for doing business with CrossWave!', { align: 'center' });

    // Finalize and save the document
    doc.end();
}

// Test Data
const invoiceData = {
    invoiceNumber: 'CW-2025-001',
    invoiceDate: '2025-01-28',
    dueDate: '2025-02-07',
    buyer: {
        name: 'Mr. Ahmed Al-Farsi',
        address: '456 Business Bay, Dubai, UAE',
        phone: '+971 50 123 4567',
        email: 'ahmed.alfarsi@example.com',
    },
    seller: {
        companyName: 'CrossWave',
        address: '123 Tech Street, Bangalore, Karnataka, India',
        phone: '+91 9876543210',
        email: 'sales@crosswave.com',
    },
    items: [
        {
            description: 'Smartphone',
            quantity: 1,
            unitPrice: '15,000 INR',
            total: '15,000 INR',
        },
        {
            description: 'Laptop',
            quantity: 1,
            unitPrice: '50,000 INR',
            total: '50,000 INR',
        },
    ],
    subtotal: '65,000 INR',
    tax: '11,700 INR',
    total: '76,700 INR',
};

// Generate the Invoice
generateInvoice(invoiceData, 'CrossWave-Invoice.pdf');
