import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";
import Article, { Articles } from "../../models/article";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = {
  article: Articles;
};

/* Allows you to view pet card info and delete pet card*/
const ArticlePage = ({ article }: Props) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const articleID = router.query.id;

    try {
      await fetch(`/api/articles/${articleID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the article.");
    }
  };

  return (
    <div key={article._id}>
      <div className="card">
        <img src={article.image_url} />
        <h5 className="article-title">{article.title}</h5>
        <div className="main-content">
          <p className="article-author">{article.author}</p>
          <p className="category">Category: {article.category}</p>

          {/* Extra Pet Info: Likes and Dislikes
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {pet.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {pet.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div> */}

          <div className="btn-container">
            <Link href={`/${article._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}: GetServerSidePropsContext) => {
  await dbConnect();

  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const article = await Article.findById(params.id).lean();

  if (!article) {
    return {
      notFound: true,
    };
  }

  /* Ensures all objectIds and nested objectIds are serialized as JSON data */
  const serializedArticle = JSON.parse(JSON.stringify(article));

  return {
    props: {
      article: serializedArticle,
    },
  };
};

export default ArticlePage;
