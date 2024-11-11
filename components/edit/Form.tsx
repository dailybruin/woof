import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { TAGS } from '@/constants';
import Markdown from 'react-markdown';
import Box from '../Box';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

interface FormData {
  title: string;
  content: string;
  //   created_date: Date;
  //   updated_date: Date;
  sections: string[];
  pinned_sections: string[];
  quick_link: boolean;
  image_url: string;
}

interface Error {
  name?: string;
  owner_name?: string;
  species?: string;
  image_url?: string;
  sections?: string;
}

type Props = {
  formId: string;
  articleForm: FormData;
  forNewArticle?: boolean;
};

const Form = ({ formId, articleForm, forNewArticle = true }: Props) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState<FormData>({
    // created_date: articleForm.created_date,
    // updated_date: articleForm.updated_date,
    title: articleForm.title,
    content: articleForm.content,
    // TODO
    // created_date: new Date(),
    // updated_date: new Date(),
    sections: articleForm.sections,
    pinned_sections: articleForm.pinned_sections,
    quick_link: articleForm.quick_link,
    image_url: articleForm.image_url,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query;
    console.log(id);

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/articles/${id}`, data, false); // Update the local data without a revalidation
      router.push('/');
    } catch (error) {
      setMessage('Failed to update article');
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push('/');
    } catch (error) {
      setMessage('Failed to add article');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const formValidate = () => {
    let err: Error = {};
    if (!form.content) err.name = 'Content name is required';
    if (!form.title) err.owner_name = 'Article title is required';
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit button clicked!")
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewArticle ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const handleDelete = async () => {
    const { id } = router.query;
    console.log("Delete button clicked!")
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
      });
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      setMessage('Article deleted successfully');
      router.push('/'); // Navigate back to the articles list or homepage
    } catch (error) {
      setMessage('Failed to delete article');
    }
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      handleDelete();
    }
  };

  const styles = {
    container: {
      display: 'flex',
      maxWidth: '100%',
      overflow: 'hidden',
    },
    boxContainer: {
      flex: 4,
      overflow: 'hidden',
    },
    formContainer: {
      flex: 1,
      overflow: 'hidden',
    },
  };

  const [previousSections, setPreviousSections] = useState<string[]>([]);

  return (
    <div style={{ ...styles.container, flexDirection: 'row', padding: '30px' }}>
      <div
        style={styles.boxContainer}
        className="border-4 border-black bg-white rounded-2xl h-full"
      >
        <Box title={
            
            <div className="flex items-center w-full">
            <input
              type="text"
              maxLength={30}
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-transparent border-none outline-none text-white p-5 w-full"
            />
            
            <div className="flex gap-2 p-[15px]">
              {/* <DeleteIcon onClick={() => handleDelete()} /> */}
              <DeleteIcon onClick={confirmDelete} />
              <LocalPrintshopIcon onClick={handleSubmit} />
              {/* <LocalPrintshopIcon onClick={() => console.log("Submit clicked!")} /> */}
            </div>
          </div>
          }
             innerText="" color="accent-purple">
          
          <textarea
              maxLength={500}
              name="content"
              value={form.content}
              onChange={handleChange}
              style={{ 
                height: '70vh', 
                width: '100%',
                backgroundColor: 'transparent', 
                border: 'none',                 
                outline: 'none',
                padding: '5px',
              }}
              required
            />
        </Box>
      </div>

      <div style={{ flex: 0.1 }}></div>

      <div style={styles.formContainer} className="border-4 border-black bg-white rounded-2xl">
        <Box 
          title = {
            <div className="flex items-center w-full">
              <p className="bg-transparent border-none outline-none text-white px-2 w-full text-left">
                Tags
              </p>
              
            </div>
            
          } 
          innerText=""
        >
          <form id={formId} onSubmit={handleSubmit}>

            {TAGS.map((tag, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={tag}
                    value={tag}
                    checked={form.sections.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          sections: [...form.sections, tag],
                        });
                        setPreviousSections([...form.sections, tag]);
                      } else {
                        setForm({
                          ...form,
                          sections: form.sections.filter(
                            (section) => section !== tag,
                          ),
                          pinned_sections: form.pinned_sections.filter(
                            (section) => section !== tag,
                          ),
                        });
                      }
                    }}
                  />
                  <label htmlFor={tag}>{tag}</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.pinned_sections.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          pinned_sections: [...form.pinned_sections, tag],
                        });
                      } else {
                        setForm({
                          ...form,
                          pinned_sections: form.pinned_sections.filter(
                            (section) => section !== tag,
                          ),
                        });
                      }
                    }}
                  />
                  <label>Pinned</label>
                </div>
              </div>
            ))}
            
            <div className="flex justify-start items-center space-x-2">
                <input
                  type="checkbox"
                  name="allTags"
                  className="w-3 h-3"
                  checked={form.sections.length === TAGS.length} // Check if all tags are selected
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreviousSections(form.sections); // Save current selections
                      setForm({
                        ...form,
                        sections: TAGS, // Select all tags
                      });
                    } else {
                      setForm({
                        ...form,
                        sections: previousSections, // Restore previously selected tags
                        pinned_sections: form.pinned_sections.filter(
                          (section) => previousSections.includes(section)
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="pinned_to_all">Pinned to All</label>
            </div>
            
            <div className="flex justify-start items-center space-x-2">
              <input
                type="checkbox"
                name="quick_link"
                className="w-3 h-3"
                checked={form.quick_link}
                onChange={(e) => {
                  setForm({
                    ...form,
                    quick_link: e.target.checked,
                  });
                }}
              />
              <label htmlFor="quick_link">Add to Quick Links</label>
            </div>
          </form>
        </Box>
        <p>{message}</p>
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
