import dbConnect from './dbConnect';
import Article from '../models/article';

export const fetchArticles = async (section?: string) => {
  await dbConnect();
  let query = {};
  if (section) {
    query = { sections: { $in: [section] } };
  }
  const result = await Article.find(query);

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const articles = result.map((doc) => {
    return JSON.parse(JSON.stringify(doc));
  });

  return articles;
};
