import Link from 'next/link';
import Box from '../Box';
import Markdown from 'react-markdown';
import { Articles } from '../../models/article';
import PinnedArticles from '../PinnedArticles';
import { SearchResults } from './SearchResults';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { putData, FormData, deleteData } from '../ApiUtils';
import { useRouter } from 'next/router';

type Props = {
  articles: Articles[];
  section?: string;
  color?: string;
};

const ArticleList = ({
  articles,
  section = '',
  color = 'accent-purple',
}: Props) => {

  const [articleList, setArticleList] = useState<Articles[]>(articles);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleEditClick = (articleId: string, currentContent: string) => {
    setEditingArticleId(articleId);
    setEditedContent(currentContent);
  };

  const handleDeleteClick = async (articleId: string) => {
    console.log("deleting this beautiful article now");
    await deleteData(articleId, setMessage, router);
    setArticleList((prevList) => prevList.filter(article => article._id != articleId));
  };

  const handleSaveClick = async (articleId: string, article: Articles) => {
    // Save the edited content logic here (e.g., API call to update the article in the database)
    console.log(
      'Save content for article ID:',
      articleId,
      'Content:',
      editedContent,
    );

    const form: FormData = {
      title: article.title,
      content: editedContent,
      sections: article.sections,
      pinned_sections: article.pinned_sections,
      quick_link: article.quick_link,
      image_url: article.image_url,
    };

    await putData(form, articleId, 'application/json', setMessage, router);

    // i think we need a better way of doing this

    setArticleList((prevArticles) =>
        prevArticles.map((a) =>
          a.title === article.title ? ({ ...a, content: editedContent } as Articles) : a
        )
      );

    setEditingArticleId(null);
    setEditedContent('');
  };

  return (
    <main
      className={`flex-grow flex min-h-screen flex-col justify-between pt-8 pl-8 pb-8 pr-0`}
    >
      <SearchResults section={section} color={color}></SearchResults>
      <div className="rounded-2xl border-black border-t-[0.5vmin] border-l-[0.5vmin] border-b-[0.8vmin] border-r-[0.8vmin] bg-white">
        <div
          className={`border-black border-b-[0.5vmin] bg-${color} h-[8vmin] w-full rounded-t-lg items-center pl-[3vmin] flex p-[1vmin]`}
        >
          <p className="font-semibold text-center text-[4vmin] justify-center text-black bg-transparent quick-links pt-[1vmin]">
            {section || 'All'}
          </p>
        </div>
        <PinnedArticles articles={articleList} section={section} color={color} />
        {articleList.length > 0 ? (
          articleList.map((article) => (
            <div key={article._id}>
            <div className="group">
              <Box
                title={
                  <Link href={`/${article._id}`}>
                    {article.title}
                  </Link>
                }
                innerText=""
                color={color}
              />
                {/* <p className="py-[1.2vmin] px-[3.7vmin] rounded-b-lg">
                  {article.title}
                </p> */}
                <div className="flex justify-between items-center">
                  {
                  editingArticleId === article._id ? (
                  <textarea
                    className="prose border rounded p-2 w-full resize-none overflow-hidden"
                    value={editedContent}
                    ref={(el) => {
                      if (el) {
                        el.style.height = "autoa";
                        el.style.height = `${el.scrollHeight}px`;
                      }
                    }}
                    onChange={(e) => {
                      setEditedContent(e.target.value);
                      e.target.style.height = "auto"; 
                      e.target.style.height = `${e.target.scrollHeight}px`; 
                    }}
                  />
                
                ) : (
                  <Markdown className="prose">{article.content}</Markdown>
                )}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {editingArticleId === article._id ? (
                    <SaveIcon onClick={() => handleSaveClick(article._id, article)} />
                  ) : (
                    <ModeEditIcon
                      onClick={() => handleEditClick(article._id, article.content)}
                    />
                  ) }
                  <DeleteIcon onClick={() => handleDeleteClick(article._id)} />
                </div>
                  </div>
              </div>
                {/* </Box> */}
            </div>
            
          ))
        ) : (
          <p>No articles available.</p>
        )}
        {/* <div className="main-content">
                <div className="btn-container">
                  <Link
                    href={{
                      pathname: '/[id]/edit',
                      query: { id: article._id },
                    }}
                  >
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link href={{ pathname: '/[id]', query: { id: article._id } }}>
                    <button className="btn view">View</button>
                  </Link>
                </div>
              </div> */}
        {/* <div className="p-8">
          <ul>
            <li>How to use InDesign</li>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
            <li>How to use InDesign</li>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
          </ul>
        </div> */}
      </div>
    </main>
  );
};

export default ArticleList;
