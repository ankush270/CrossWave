# API Documentation

## Product Routes

### Add Product
- **Endpoint:** `POST /add-product`
- **Middleware:** `multer` (max 10 images)
- **Request Body:**
```json
{
  "name": "Cotton T-Shirt",
  "stock": 100,
  "category": "Apparel",
  "description": "Premium cotton t-shirt",
  "features": ["Breathable", "Comfortable"],
  "specifications": ["100% Cotton", "Round Neck"],
  "weight_per_unit_in_gm": 200,
  "buy_options": [
    {
      "categories": "Sample",
      "min_quantity": 2,
      "price_per_unit": 15
    }
  ],
  "height_in_cm": 70,
  "width_in_cm": 50
}
```
- **Files:** Images (form-data: "images")
- **Response (201):**
```json
{
  "message": "Product added successfully",
  "product": {
    "_id": "...",
    "name": "Cotton T-Shirt",
    "images": ["path/to/image1", "path/to/image2"]
  }
}
```

### Get All Products
- **Endpoint:** `GET /get-product`
- **Response (200):**
```json
[
  {
    "_id": "...",
    "name": "Cotton T-Shirt",
    "stock": 100,
    "category": "Apparel"
  }
]
```

### Get User Products
- **Endpoint:** `GET /get-user-product/:seller`
- **Parameters:** `seller` (seller ID)
- **Response (200):**
```json
[
  {
    "_id": "...",
    "name": "Product Name",
    "seller": "seller_id"
  }
]
```

### Remove Product
- **Endpoint:** `DELETE /remove-product/:productId`
- **Parameters:** `productId`
- **Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

### Update Product
- **Endpoint:** `PUT /update-product/:productId`
- **Parameters:** `productId`
- **Request Body:**
```json
{
  "stock": 150,
  "features": ["Updated Feature"],
  "specifications": ["Updated Spec"],
  "category": "Updated Category"
}
```

## Review Routes

### Add Review
- **Endpoint:** `POST /review/:reviewee_id`
- **Parameters:** `reviewee_id`
- **Request Body:**
```json
{
  "reviewer_id": "user_id",
  "description": "Great service!",
  "rating": 5
}
```
- **Response (201):**
```json
{
  "_id": "...",
  "reviewer_id": "user_id",
  "description": "Great service!",
  "rating": 5,
  "reviewee_id": "..."
}
```

### Get Reviews
- **Endpoint:** `GET /get-reviews/:reviewee_id`
- **Parameters:** `reviewee_id`
- **Response (200):**
```json
[
  {
    "_id": "...",
    "description": "Great service!",
    "rating": 5
  }
]
```

### Get Average Rating
- **Endpoint:** `GET /avg-rating/:reviewee_id`
- **Parameters:** `reviewee_id`
- **Response (200):**
```json
{
  "avg": 4.5
}
```

## Order Routes

### Create Order
- **Endpoint:** `POST /addorder`
- **Request Body:**
```json
{
  "buyer_id": "buyer_123",
  "seller_id": "seller_123",
  "product_id": "product_123",
  "quote_id": "quote_123",
  "logistics_id": "logistics_123",
  "payment_id": "payment_123",
  "quantity": 50,
  "price": 1000,
  "shiping_address": {
    "address_lane1": "123 Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  },
  "billing_address": {
    "address_lane1": "123 Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  }
}
```

### Update Order Status
- **Endpoint:** `PUT /update-status/:id`
- **Parameters:** `id` (order ID)
- **Request Body:**
```json
{
  "status": "shipped"
}
```

### Get Buyer Orders
- **Endpoint:** `GET /get-orders-buyer/:buyer_id`
- **Parameters:** `buyer_id`
- **Response (200):**
```json
[
  {
    "_id": "...",
    "status": "pending",
    "quantity": 50,
    "price": 1000
  }
]
```

### Get Seller Orders
- **Endpoint:** `GET /get-orders-seller/:seller_id`
- **Parameters:** `seller_id`
- **Response:** Same as buyer orders

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
