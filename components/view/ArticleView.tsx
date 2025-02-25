// components/view/ArticleView.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import NavBar from '../layout/NavBar';
import { useRouter } from 'next/router';

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
  const location = useRouter();
  const pathname = location.pathname;
  // const articleId = pathname.substring(pathname.lastIndexOf('/') + 1);
  
  return (
    <div>
      <NavBar pathname={pathname}/>
      <div className="article-view" style={{ margin: '2em', border: '5px solid #000000', borderRadius: '1em', fontFamily: 'Rockwell, sans-serif' }}>
      <div style={{ backgroundColor: '#C077CC', padding: '1em', borderRadius: '0.45em 0.45em 0em 0em', fontSize: '24px', borderBottom: '4px solid #000000'}}>
        <h1 style={{ color: '#FFFEE4' }}>{article.title}</h1>
      </div> 
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0em 0em 0.60em 0.60em', padding: '1em' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {article.image_url && <img src={article.image_url} alt={article.title} style={{ maxWidth: '100%', maxHeight: '300px', width: 'auto', height: 'auto' }} />}
        </div>
        <p className={'prose'}> <ReactMarkdown>{article.content}</ReactMarkdown></p>
        <p>
          <strong>Created:</strong> {new Date(article.created_date).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong> {new Date(article.updated_date).toLocaleString()}
        </p>
        {article.sections && (
          <div>
            <strong>Sections:</strong>
            <ol>
              {article.sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ol>
          </div>
        )}
        {article.quick_link && <p>This is a Quick Link article.</p>}
      </div>
    </div>
    </div>
  );
};

export default ArticleView;
