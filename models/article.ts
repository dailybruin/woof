import mongoose from "mongoose";

export interface Articles extends mongoose.Document {
  title: string;
  content: string;
  created_date: Date;
  updated_date: Date;
  sections: string[];
  quick_link: boolean;
  image_url: string;
}

/* ArticleSchema will correspond to a collection in your MongoDB database. */
const ArticleSchema = new mongoose.Schema<Articles>({
  title: {
    /* The name of this article */

    type: String,
    required: [true, 'Please provide a title.'],
    maxlength: [80, 'Name cannot be more than 80 characters'],
  },
  content: {
    /* List of  contents */

    type: String,
    required: [true, "Please provide the content's name"],
    maxlength: [60, "Content's Name cannot be more than 60 characters"],
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
    required: [true, 'Please provide content for this article.'],
  },
  sections: {
    type: [String],
  },
  quick_link: {
    type: Boolean,
    required: [true, 'Please provide a quickLink value for this article.'],
  },
  image_url: {
    /* Url to article image */

    required: [true, 'Please provide an image url for this article.'],
    type: String,
  },
});

export default mongoose.models.Article ||
  mongoose.model<Articles>("Article", ArticleSchema);
