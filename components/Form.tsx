import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { TAGS } from '@/constants';
import Markdown from 'react-markdown';
import Box from './Box';

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
    // content: articleForm.content,
    // image_url: articleForm.image_url,
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

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err: Error = {};
    if (!form.content) err.name = 'Content name is required';
    if (!form.title) err.owner_name = 'Article title is required';
    if (!form.image_url) err.image_url = 'Image URL is required';
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewArticle ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  const styles = {
    container: {
      display: 'flex',
      maxWidth: '100%',
      overflow: 'hidden',
    },
    boxContainer: {
      flex: 1,
      overflow: 'hidden',
    },
    formContainer: {
      width: '300px',
      flexShrink: 0,
    },
  };

  return (
    <div style={{ ...styles.container, flexDirection: 'row' }}>
      <div
        style={styles.boxContainer}
        className="border-4 border-black bg-white"
      >
        <Box title={form.title} innerText="">
          <Markdown
            className="prose"

            // components={{
            //   p(props) {
            //     const { node, ...rest } = props;
            //     return <p style={{ backgroundColor: 'red' }} {...rest} />;
            //   },
            // }}
          >
            {form.content}
          </Markdown>
        </Box>
      </div>
      <div style={styles.formContainer}>
        <form id={formId} onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            maxLength={30}
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="content">Content</label>
          <textarea
            maxLength={500}
            name="content"
            value={form.content}
            onChange={handleChange}
            style={{ height: '300px', width: '100%' }}
            required
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="created_date"
            value={Date.now()}
            onChange={handleChange}
          />

          {/* tags sections*/}
          <label htmlFor="sections" className="font-bold">
            Sections
          </label>
          {TAGS.map((tag, index) => (
            <div key={index}>
              <label htmlFor={tag}>{tag}</label>
              <input
                type="checkbox"
                name={tag}
                value={tag}
                checked={form.sections.includes(tag)}
                onChange={(e) => {
                  console.log(form.sections);
                  if (e.target.checked) {
                    setForm({
                      ...form,
                      sections: [...form.sections, tag],
                    });
                  } else {
                    setForm({
                      ...form,
                      sections: form.sections.filter(
                        (section) => section !== tag,
                      ),
                    });
                  }
                }}
              />
              <input
                type="checkbox"
                name={tag}
                value={tag}
                checked={form.pinned_sections?.includes(tag)}
                onChange={(e) => {
                  console.log(form.sections);
                  if (e.target.checked) {
                    setForm({
                      ...form,
                      sections: [...form.sections, tag],
                    });
                  } else {
                    setForm({
                      ...form,
                      sections: form.sections.filter(
                        (section) => section !== tag,
                      ),
                    });
                  }
                }}
              />
            </div>
          ))}

          <label htmlFor="quick_link">Quick Link?</label>
          <input
            type="checkbox"
            name="quick_link"
            checked={form.quick_link}
            onChange={(e) => {
              setForm({
                ...form,
                quick_link: e.target.checked,
              });
            }}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
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
