import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Article from "../../../models/article";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const articles = await Article.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: articles });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const article = await Article.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: article });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
