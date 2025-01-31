
# Document Upload Microservice

A microservice for handling document uploads, storage, and management using Cloudinary and MongoDB.

## Features

- Upload multiple documents
- Store documents in Cloudinary
- Manage document metadata in MongoDB
- Secure file handling
- User-specific document management
- Support for various file types
- Integration-ready API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd document-upload-service
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
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
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

### Health Check
```http
GET /health
```

### Upload Documents
```http
POST /api/documents/upload
Headers:
  X-User-Id: string
  X-User-Email: string
Body: multipart/form-data
  - files: File[]
  - title: string
```

### List Documents
```http
GET /api/documents/list
Headers:
  X-User-Id: string
  X-User-Email: string
```

### Delete Document
```http
DELETE /api/documents/:id
Headers:
  X-User-Id: string
  X-User-Email: string
```

## Integration Guide

### Example Integration

```javascript
// Example integration in another service
async function uploadDocument(userId, userEmail, file, title) {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('title', title);

    const response = await fetch('http://document-service/api/documents/upload', {
        method: 'POST',
        headers: {
            'X-User-Id': userId,
            'X-User-Email': userEmail
        },
        body: formData
    });

    return response.json();
}
```

## Configuration

Service configuration can be found in `config/service.config.js`:

- File size limits
- Allowed file types
- CORS settings
- API endpoints
- Other service settings

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

## Security

- CORS protection
- Helmet security headers
- File type validation
- Size limits
- User authentication via headers

## Project Structure

```
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
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

