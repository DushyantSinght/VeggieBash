import { v2 as cloudinary } from "cloudinary"
import Product from "../models/product.js"
import fs from "fs"
// export const addProduct = async (req, res) => {
//   try {
//     const productData = JSON.parse(req.body.productData);
//     const images = req.files;

//     if (!images || images.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No images uploaded",
//       });
//     }

//     // Upload files to Cloudinary
//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//           folder: "products",
//         });

//         console.log("✅ Uploaded to Cloudinary:", result.secure_url);

//         // Clean up local file
//         fs.unlink(item.path, (err) => {
//           if (err) console.error("❌ Failed to remove local file:", err.message);
//         });

//         return result.secure_url;
//       })
//     );

//     // Save product with Cloudinary URLs
//     const newProduct = await Product.create({ ...productData, image: imagesUrl });

//     return res.status(201).json({
//       success: true,
//       message: "Product added successfully!",
//       product: newProduct,
//     });
//   } catch (error) {
//     console.error("❌ AddProduct Error:", error.message);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// productController.js
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // Upload buffer directly to Cloudinary (no file path needed)
    const imagesUrl = await Promise.all(
      images.map((item) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(item.buffer); // use buffer instead of item.path
        });
      })
    );

    const newProduct = await Product.create({ ...productData, image: imagesUrl });

    return res.status(201).json({ success: true, message: "Product added!", product: newProduct });
  } catch (error) {
    console.error("AddProduct Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product: /api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
// Get single Product: /api/product/id
export const productById = async (req, res)=> 
    async (req, res)=>{
    try {
        const {id} = req.body;
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
// Get Product inStock: /api/product/stock
// export const changeStock = async (req, res)=>
//     async (req, res)=>{
//     try {
//         const {id, inStock} = req.body;
//         await Product.findByIdAndUpdate(id,{inStock});
//         res.json({success: true, message: "Stock Updated"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message })
//     }
// }
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    // ✅ update and return updated product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { inStock: Boolean(inStock) }, // force boolean
      { new: true } // return updated doc
    );

    res.json({
      success: true,
      message: "Stock Updated",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("changeStock error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
