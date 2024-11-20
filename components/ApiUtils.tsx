// apiUtils.ts (or any other utility file)
import { mutate } from 'swr';

export interface FormData {
    title: string;
    content: string;
    //   created_date: Date;
    //   updated_date: Date;
    sections: string[];
    pinned_sections: string[];
    quick_link: boolean;
    image_url: string;
  }

export const putData = async (
    form: FormData,
    id: string | string[] | undefined,
    contentType: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    router: any
  ) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });
  
      if (!res.ok) {
        throw new Error(res.status.toString());
      }
  
      const { data } = await res.json();
  
      mutate(`/api/articles/${id}`, data, false); // Update the local data without revalidation
     
    } catch (error) {
      setMessage('Failed to update article');
    }
  };
  


export const postData = async (
    form: FormData,
    id: string,
    contentType: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    router: any
) => {

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