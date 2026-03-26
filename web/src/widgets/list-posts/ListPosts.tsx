import React from 'react';
import { useToolOutput } from '../../shared/hooks/useToolOutput.js';
import { PostCard } from './PostCard.js';
import type { Post } from '../../shared/types/posts.js';

interface ListPostsOutput {
  posts: Post[];
}

export function ListPosts() {
  const toolOutput = useToolOutput<ListPostsOutput>();

  if (!toolOutput) {
    return null;
  }

  const { posts } = toolOutput;

  if (!posts || posts.length === 0) {
    return (
      <div className="p-6 text-center text-muted">
        No posts available at this time.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
