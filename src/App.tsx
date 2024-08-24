import { type ReactNode, useEffect, useState } from "react";
import "./App.css";
import { get } from "./utils/http";
import ImgSrc from "./assets/data-fetching.png";
import BlogPosts from "./components/BlogPosts";
import ErrorMessage from "./components/ErrorMessage";
type RawPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};
type BlogPost = {
  id: number;
  title: string;
  text: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string>();

  async function fetchPosts() {
    try {
      const data = (await get(
        "https://jsonplaceholder.typicode.com/posts"
      )) as RawPost[];
      const blogPosts: BlogPost[] = data.map((rawPost) => {
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        };
      });
      setFetchedPosts(blogPosts);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <ErrorMessage text={error}></ErrorMessage>;
  } else {
    content = <BlogPosts posts={fetchedPosts}></BlogPosts>;
  }
  return (
    <main>
      <img src={ImgSrc} alt="" />
      {content}
    </main>
  );
}

export default App;
