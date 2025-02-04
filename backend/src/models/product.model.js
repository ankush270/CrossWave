import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: [{
    type: String,
  }],
  origin: {
    type: String,
    required: true,
  },
  moq: {
    type: Number,
    required: true,
  },
  pricing: {
    sample: {
      price: {
        type: Number,
        required: true,
      },
      moq: {
        type: Number,
        required: true,
      },
      features: [{
        type: String,
      }],
    },
    standard: {
      price: {
        type: Number,
        required: true,
      },
      moq: {
        type: Number,
        required: true,
      },
      features: [{
        type: String,
      }],
    },
    premium: {
      price: {
        type: Number,
        required: true,
      },
      moq: {
        type: Number,
        required: true,
      },
      features: [{
        type: String,
      }],
    },
  },
  specifications: {
    technical: [{
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    }],
    physical: [{
      key: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    }],
  },
  seller_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Product = mongoose.model("Product", productSchema);