# React + TypeScript + Vite

Use fetch to get blogs data from https://jsonplaceholder.typicode.com/posts.
Deald with try-catch to the function.

- fetch data:

```js
export async function get(url:string){
    const response = await fetch(url);

    if(!response.ok){
        throw Error('Failed to fetch data. ');
    }

    const data = await response.json() as unknown;
    return data;
}
```

- try-catch code snip

```js
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
```
