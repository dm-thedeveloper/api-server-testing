import cors from "cors";
import express from "express";
import axios from "axios";
import multer from "multer";
import fs from "fs";
import FormData from "form-data";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

// Default Route

app.post("/rm-bg", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const formData = new FormData();
    formData.append("image_file", fs.createReadStream(filePath));
    formData.append("size", "auto");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": "6jdF6d5YJ65mUUHc7DHnU3qu",
        },
        responseType: "arraybuffer",
      }
    );

    fs.unlinkSync(filePath); // delete temp file

    const base64Image = Buffer.from(response.data).toString("base64");
    const dataUrl = `data:image/png;base64,${base64Image}`;
    // res.json({ imageUrl: dataUrl });
    res.send(`<img src="${dataUrl}" /> <br/> <a href=${dataUrl} download>
  <button>Download Image</button>
</a> `);
  } catch (error) {
    console.error("Remove.bg Error:", error.response?.data || error.message);
    res.status(500).send("Error removing background");
  }
});

app.listen(2000, () => {
  console.log("✅ Server running: http://localhost:2000");
});
