// import multer from 'multer';
// //for uploading images on cloudinary
// export const upload = multer({storage: multer.diskStorage}); 
import multer from "multer";
import path from "path";

// Configure local disk storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g. 1691234567890-123.png
//   },
// });

const storage = multer.memoryStorage(); // store file in buffer

// Export multer upload middleware
export const upload = multer({ storage: storage });
