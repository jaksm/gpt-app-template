const API_URL = process.env.API_URL || "https://jsonplaceholder.typicode.com";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function listPosts(params?: {
  limit?: number;
  search?: string;
}): Promise<{ posts: Post[]; total: number }> {
  const res = await fetch(`${API_URL}/posts`);
  let posts: Post[] = await res.json();

  if (params?.search) {
    const q = params.search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    );
  }

  const total = posts.length;
  if (params?.limit) posts = posts.slice(0, params.limit);

  return { posts, total };
}
