import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { TAGS } from '@/constants';

interface FormData {
  title: string;
  content: string;
  //   created_date: Date;
  updated_date: Date;
  sections: string[];
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
    title: articleForm.title,
    content: articleForm.content,
    updated_date: new Date(),
    sections: articleForm.sections,
    quick_link: false,
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

  return (
    <>
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
        <input
          type="text"
          maxLength={500}
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <label htmlFor="sections">Sections</label>
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
          </div>
        ))}

        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
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
    </>
  );
};

export default Form;
