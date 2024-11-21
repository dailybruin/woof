// components/view/ArticleView.tsx
import React from 'react';

interface ArticleViewProps {
  article: {
    _id: string;
    title: string;
    content: string;
    image_url?: string;
    created_date: string;
    updated_date: string;
    sections: string[];
    pinned_sections: string[];
    quick_link: boolean;
  };
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  return (
    <div className="article-view">
      <h1>{article.title}</h1>
      {article.image_url && <img src={article.image_url} alt={article.title} />}
      <p>{article.content}</p>
      <p>
        <strong>Created:</strong> {new Date(article.created_date).toLocaleString()}
      </p>
      <p>
        <strong>Last Updated:</strong> {new Date(article.updated_date).toLocaleString()}
      </p>
      {article.sections && (
        <div>
          <strong>Sections:</strong>
          <ul>
            {article.sections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ul>
        </div>
      )}
      {article.quick_link && <p>This is a Quick Link article.</p>}
    </div>
  );
};

export default ArticleView;
