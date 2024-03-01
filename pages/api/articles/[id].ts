import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Article from "../../../models/article";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const article = await Article.findById(id);
        if (!article) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const article = await Article.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!article) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedArticle = await Article.deleteOne({ _id: id });
        if (!deletedArticle) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
