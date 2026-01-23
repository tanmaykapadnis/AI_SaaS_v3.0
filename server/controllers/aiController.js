import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import FormData from "form-data";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

/* ================= GEMINI REST CONFIG ================= */

// ✅ THIS WORKS WITH FREE API KEY
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

/* ================= ARTICLE GENERATION ================= */

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free limit reached. Upgrade to continue.",
      });
    }

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${prompt}\n\nWrite approximately ${length} words.`,
              },
            ],
          },
        ],
      }
    );

    const content =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) throw new Error("No content returned from Gemini");

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("ARTICLE ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ================= BLOG TITLE ================= */

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free limit reached. Upgrade to continue.",
      });
    }

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const content =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) throw new Error("No content returned from Gemini");

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: free_usage + 1 },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("BLOG TITLE ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ================= IMAGE GENERATION (CLIPDROP) ================= */

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({ success: false, message: "Premium feature only." });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data).toString(
      "base64"
    )}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("IMAGE ERROR:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ================= BACKGROUND REMOVAL ================= */

export const removeImageBackground = async (req, res) => {
  try {
    const image = req.file;

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [{ effect: "background_removal" }],
    });

    fs.unlinkSync(image.path);

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= OBJECT REMOVAL ================= */

export const removeImageObject = async (req, res) => {
  try {
    const { object } = req.body;
    const image = req.file;

    const { public_id } = await cloudinary.uploader.upload(image.path);
    fs.unlinkSync(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
    });

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= RESUME REVIEW ================= */

export const resumeReview = async (req, res) => {
  try {
    const resume = req.file;

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);
    fs.unlinkSync(resume.path);

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Review this resume and give strengths, weaknesses, and improvements:\n${pdfData.text}`,
              },
            ],
          },
        ],
      }
    );

    const content =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
