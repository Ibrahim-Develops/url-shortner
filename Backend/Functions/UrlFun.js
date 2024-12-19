import ModelUrl from "../Models/UrlSchema.js";
import jwt from 'jsonwebtoken';


async function SpecUrls(req, res) {
    try {
        const urls = await ModelUrl.find({ userId: req.userId });
        res.json({ success: true, urls });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "An error occurred while fetching the URLs." });
    }
}

async function AllUrls(req, res) {
    try {
        const urls = await ModelUrl.find({});
        
        if (!urls || urls.length === 0) {
          return res.status(404).json({ message: "No URLs found." });
        }
    
        res.status(200).json({ urls });
      } catch (error) {
        console.error("Error fetching URLs:", error.message);
        res.status(500).json({ message: "Internal server error." });
      }
}

async function EnteredUrl(req, res) {
    const { url } = req.body;

    let words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortid = '';

    for (let i = 0; i < 6; i++) {
        shortid += words[Math.floor(Math.random() * words.length)];
    }

    const ShortUrl = `http://localhost:7001/${shortid}`;

    try {
        const data = await ModelUrl.create({ Orgurl: url, ShortUrl, userId: req.userId });

        res.json({ msg: "URL shortened successfully", shortUrl: ShortUrl });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "An error occurred while shortening the URL." });
    }
}


async function Short(req, res) {
    const { shortid } = req.params;

    try {
        const data = await ModelUrl.findOne({ ShortUrl: `http://localhost:7001/${shortid}` });

        if (!data) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.redirect(data.Orgurl);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "An error occurred" });
    }
}

async function deleteUrl(req, res) {
    const { id } = req.params;
    console.log(id);
    

    try {
        const deletedUrl = await ModelUrl.findByIdAndDelete(id);
        if (!deletedUrl) {
            return res.status(404).json({ error: "URL not found" });
        }
        res.json({ msg: "URL deleted successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "An error occurred" });
    }
}

export default { EnteredUrl, Short, deleteUrl, SpecUrls, AllUrls };
