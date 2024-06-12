import mongoose from 'mongoose';

export interface Articles extends mongoose.Document {
  title: string;
  content: string;
  created_date: Date;
  updated_date: Date;
  sections: string[];
  quick_link: boolean;
  pinned_sections: string[];
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
    required: [true, 'Please provide sections for this article.'],
  },
  pinned_sections: {
    type: [String],
    required: [true, 'Please provide pinned_sections for this article.'],
  },
  quick_link: {
    type: Boolean,
    required: [true, 'Please provide a quickLink value for this article.'],
  },
  image_url: {
    type: String,
  },
});

export default mongoose.models.Article ||
  mongoose.model<Articles>('Article', ArticleSchema);
