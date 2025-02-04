# Business Document Management Service

A microservice for handling business-related document uploads, storage, and verification using Cloudinary and MongoDB.

## Required Documents

1. Partnership Registration Number
2. Certificate of Incorporation (CIN Number)
3. Goods and Service Tax (GSTIN Number)
4. PAN Number of Business/Sole Proprietor
5. IEC (Import Export Number)
6. MSME Number (Optional)
7. DPIIT Number
8. AD Code from the Authorized Bank

## Features

- Upload and manage business documents
- Document verification status tracking
- Secure cloud storage using Cloudinary
- Document metadata management in MongoDB
- Document number validation
- Status tracking (PENDING, VERIFIED, REJECTED)
- User-specific document management
- Support for various file types (PDF, Images, etc.)
- Integration-ready API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd document-management-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your credentials:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
MONGODB_URI=mongodb://127.0.0.1:27017/cloudinary-docs
PORT=3001
ALLOWED_ORIGINS=http://localhost:3001
NODE_ENV=development
LOG_LEVEL=debug
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Testing
```bash
npm test
```

## API Documentation

### Upload Document
```http
POST /api/documents
Headers:
  X-User-Id: string
  X-User-Email: string
Body: multipart/form-data
  - files: File
  - documentType: enum[
      'PARTNERSHIP_REGISTRATION',
      'INCORPORATION_CERTIFICATE',
      'GST',
      'PAN',
      'IEC',
      'MSME',
      'DPIIT',
      'AD_CODE'
    ]
  - documentNumber: string
```

### Get All Documents
```http
GET /api/documents
Headers:
  X-User-Id: string
  X-User-Email: string
```

### Get Document Status
```http
GET /api/documents/status
Headers:
  X-User-Id: string
  X-User-Email: string
```

### Delete Document
```http
DELETE /api/documents/:documentType
Headers:
  X-User-Id: string
  X-User-Email: string
```

### Verify Document (Admin Only)
```http
POST /api/documents/:documentType/verify
Headers:
  X-User-Id: string
  X-User-Email: string
Body:
  - status: enum['VERIFIED', 'REJECTED']
  - comments: string
```

## Document States

- `NOT_UPLOADED`: Document hasn't been uploaded yet
- `PENDING`: Document uploaded, waiting for verification
- `VERIFIED`: Document has been verified by admin
- `REJECTED`: Document was rejected by admin

## Project Structure

```
project/
├── config/
│   ├── cloudinary.config.js
│   ├── database.js
│   └── service.config.js
├── middleware/
│   └── auth.js
├── models/
│   └── document.model.js
├── routes/
│   └── upload.routes.js
├── services/
│   └── upload.service.js
├── public/
│   └── index.html
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Security Features

- CORS protection
- Helmet security headers
- File type validation
- Size limits
- User authentication via headers
- Document verification workflow
- Secure file storage

## Error Handling

All endpoints return standardized error responses:

```json
{
    "error": {
        "message": "Error description",
        "code": "ERROR_CODE"
    }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

