import mongoose from "mongoose";

export interface Articles extends mongoose.Document {
  title: string;
  author: string;
  category: number;
  created_date: Date;
  updated_date: Date;
  content: string;
  image_url: string;
}

/* ArticleSchema will correspond to a collection in your MongoDB database. */
const ArtcileSchema = new mongoose.Schema<Articles>({
  title: {
    /* The name of this article */

    type: String,
    required: [true, "Please provide a title."],
    maxlength: [80, "Name cannot be more than 80 characters"],
  },
  author: {
    /* List of  authors */

    type: String,
    required: [true, "Please provide the author's name"],
    maxlength: [60, "Author's Name cannot be more than 60 characters"],
  },
  category: {
    /* The category */

    type: Number,
    required: [true, "Please specify the category of your article."],
  },
  created_date: {
    /* Created date */

    type: Date,
    default: Date.now,
  },
  updated_date: {
    /* Updated date */

    type: Date,
    default: Date.now,
  },
  content: {
    /* Article content, if applicable */

    type: String,
  },
  image_url: {
    /* Url to article image */

    required: [true, "Please provide an image url for this article."],
    type: String,
  },
});

export default mongoose.models.Article ||
  mongoose.model<Articles>("Article", ArtcileSchema);
