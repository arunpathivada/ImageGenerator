import express from "express";
import * as dotenv from 'dotenv';
import OpenAI from "openai";
dotenv.config();
const router = express.Router();

const key = process.env.OPENAI_SEC_KEY;
const openai = new OpenAI({
    apiKey: key
});
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        });
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (err) {
        console.log(err);
        res.status(500).send(err?.response?.data?.error?.message || "Internal Server Error");
    }
});

export default router;
