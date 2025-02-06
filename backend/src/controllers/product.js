import { Product } from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
  const {
    name,
    overview,
    category,
    stock,
    images,
    origin,
    moq,
    pricing,
    specifications,
  } = req.body;

  try {
    const seller_id = req.id;
    console.log(seller_id);
    if (req.role !== "seller") {
      return res.status(401).json({
        success: false,
        error: "You're not a seller",
      });
    }

    if (
      [
        name,
        overview,
        category,
        stock,
        origin,
        moq,
        pricing,
        specifications,
      ].some((field) => !field)
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({
      name,
      overview,
      category,
      stock,
      images,
      origin,
      moq,
      pricing,
      specifications,
      seller_id,
    });

    const savedProduct = await product.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "Failed to add product: " + error.message,
      });
  }
};

//  get all products......................
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


import mongoose from "mongoose";

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(200).json({ error: "No products found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductBySellerId = async (req, res) => {
  try {
    const { seller_id } = req.params;
    const products = await Product.find({ seller_id }); // Use find() to get all products for a seller
    
    if (!products.length) {
      return res.status(404).json({ error: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};


export const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const getUserProduct = async (req, res, next) => {
  try {
    const { sellerId } = req.params;

    console.log("seller ID :" , sellerId);
    const products = await Product.find({ seller: sellerId });

    console.log("products :" , products);

    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch user products" });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const {
      name,
      overview,
      category,
      stock,
      images,
      origin,
      moq,
      pricing,
      specifications,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        overview,
        category,
        stock,
        images,
        origin,
        moq,
        pricing,
        specifications,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};
