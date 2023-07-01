import fs from "fs";

export const imgMiddleware = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).flat().length == 0) {
      return res.status(400).json({ message: "No files were choosen" });
    }
    let files = Object.values(req.files).flat();
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/jpg"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message:
            "File format is incorrect, only JPEG/PNG/WEBP/JPG are allowed",
        });
      }
      //   ----------
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: "File size is too large. Maximum 10mb is allowed",
        });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
