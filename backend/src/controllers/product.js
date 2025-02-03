import { Product } from "../../models/product.model.js";

export const addProduct = async (req, res, next) => {
  const {name,stock,category,description,features,specifications,
  weight_per_unit_in_gm,buy_options,height_in_cm,width_in_cm,} = req.body;

  try {
    const id=req.id

    if (
      [
        name,
        id,
        category,
        description,
        stock,
        features,
        specifications,
        weight_per_unit_in_gm,
        buy_options,
        height_in_cm,
        width_in_cm,
      ].some((field) => field?.trim === "")
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // const images = req.files?.map((file) => file.path);
    // if (!images || images.length === 0) {
    //   return res.status(400).json({ error: "No product images provided" });
    // }

  
    const product = new Product({
      name,
      id,
      stock,
      category,
      description,
      features,
      specifications,
      weight_per_unit_in_gm,
      buy_options,
      height_in_cm,
      width_in_cm,
      //images,
      //seller_name: "req.user.fullname",
      //seller_country: "req.user.country",
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: "Product added successfully", product: savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success:false,
      error: "Failed to add product"+  error.message
    });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    console.log(req.params);

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
    res.status(500).json({
      error: "Failed to delete product",
      message: error.message,
    });
  }
};

export const getUserProduct = async (req, res, next) => {
  try {
    const { seller } = req.params;
    const products = await Product.find({ seller });
    if (!products || products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }
    const {
      stock,
      features,
      specifications,
      weight_per_unit_in_gm,
      buy_options,
      height_in_cm,
      width_in_cm,
      category,
    } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        stock,
        features,
        specifications,
        weight_per_unit_in_gm,
        buy_options,
        height_in_cm,
        width_in_cm,
        category,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
  }
};
