# Real-time Price Negotiation System

A real-time negotiation system that allows buyers and sellers to negotiate product prices using WebSocket communication. The system enables real-time bidding, offer acceptance/rejection, and instant updates for all participants.

## Features

- Real-time bidding system using WebSocket
- Buyer and seller roles with separate interfaces
- Product-based negotiation
- Live offer updates
- Accept/Reject functionality
- Negotiation history tracking
- User authentication based on roles
- Clean and responsive UI

## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO
  - MongoDB with Mongoose
  - CORS

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript
  - Socket.IO Client

## Project Structure
```
Product/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   └── chat.controller.js # Chat controller logic
├── models/
│   └── chat.model.js      # MongoDB schema
├── routes/
│   └── chat.routes.js     # API routes
├── services/
│   └── socket.service.js  # WebSocket service
├── test.html             # Testing interface
├── test-server.js        # Test server
├── .env                  # Environment variables
├── package.json
└── server.js            # Main server file
```

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
cd Product
npm install
```

3. Configure environment variables in `.env`:
```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/CrossWave
```

4. Start MongoDB server

5. Start the application:
```bash
npm run dev
```

6. Start test server:
```bash
node test-server.js
```

7. Access test interface:
```
http://localhost:8080/test.html
```

## WebSocket Events

### Client to Server Events

#### Join Negotiation
```javascript
socket.emit('join_negotiation', {
    role: 'buyer|seller',
    userId: 'string'
});
```

#### Make Offer
```javascript
socket.emit('make_offer', {
    price: number,
    quantity: number
});
```

#### Accept/Reject Offer
```javascript
socket.emit('accept_offer', {});
socket.emit('reject_offer', {});
```

### Server to Client Events

#### Negotiation State Update
```javascript
socket.on('negotiation_state', (chat) => {
    // Full chat object with history
});
```

#### New Offer Received
```javascript
socket.on('new_offer', {
    price: number,
    quantity: number,
    proposedBy: {
        userId: string,
        role: string
    },
    timestamp: date
});
```

## API Endpoints

### Create New Chat
```http
POST /api/chat/start
Content-Type: application/json

{
    "productId": "string",
    "productName": "string",
    "initialPrice": number,
    "sellerId": "string",
    "buyerId": "string"
}
```

### Get Chat by ID
```http
GET /api/chat/:id
```

### Get All Chats
```http
GET /api/chat
```

## Testing Guide

1. Open test interface in two browser windows
2. In first window:
   - Select "Seller" role
   - Click "Start Negotiation"
3. In second window:
   - Select "Buyer" role
   - Click "Start Negotiation"
4. Start negotiating:
   - Enter price and quantity
   - Click "Make Offer"
   - Accept/Reject offers
   - Monitor real-time updates

## Data Model

### Chat Schema
```javascript
{
    productId: String,
    productName: String,
    initialPrice: Number,
    sellerId: String,
    buyerId: String,
    status: String,         // active/accepted/rejected
    negotiations: [{
        price: Number,
        quantity: Number,
        proposedBy: {
            userId: String,
            role: String
        },
        timestamp: Date
    }],
    finalPrice: Number,
    finalQuantity: Number,
    updatedAt: Date
}
```

## Error Handling

- Connection errors are automatically retried
- Invalid offers show error messages
- Unauthorized access is blocked
- Database errors are logged
- Real-time error notifications

## Security Features

- Role-based access control
- Input validation
- Error handling
- CORS protection
- WebSocket authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License. 