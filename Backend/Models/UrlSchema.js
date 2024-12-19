import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    Orgurl: {
        type: String,
        required: true,
    },
    ShortUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    }
});


const ModelUrl = mongoose.model("Urls", UrlSchema);

export default ModelUrl;
