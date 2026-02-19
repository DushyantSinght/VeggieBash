
import multer from "multer";

const storage = multer.memoryStorage(); // ✅ NOT diskStorage

export const upload = multer({ storage });
