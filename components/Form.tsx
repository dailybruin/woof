import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

interface FormData {
  title: string;
  author: string;
  category: number;
  created_date: Date;
  updated_date: Date;
  content: string;
  image_url: string;
}

interface Error {
  name?: string;
  owner_name?: string;
  species?: string;
  image_url?: string;
}

type Props = {
  formId: string;
  articleForm: FormData;
  forNewArticle?: boolean;
};

const Form = ({ formId, articleForm, forNewArticle = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    // title: articleForm.title,
    // author: articleForm.author,
    // category: articleForm.category,
    // created_date: articleForm.created_date,
    // updated_date: articleForm.updated_date,
    // content: articleForm.content,
    // image_url: articleForm.image_url,
    title: "articleForm.title",
    author: "articleForm.author",
    category: 1,
    created_date: new Date(),
    updated_date: new Date(),
    content: "articleForm.content",
    image_url: "articleForm.image_url",
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/articles/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update article");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add article");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    // const value =
    //   target.name === "author" // ???
    //     ? (target as HTMLInputElement).checked
    //     : target.value;
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
    if (!form.author) err.name = "Author name is required";
    if (!form.title) err.owner_name = "Article title is required";
    if (!form.image_url) err.image_url = "Image URL is required";
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
          maxLength={20}
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          maxLength={20}
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          maxLength={30}
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="created_date"
          value={Date.now()}
          onChange={handleChange}
        />

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
