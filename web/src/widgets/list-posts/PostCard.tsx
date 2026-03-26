import React from 'react';
import { Badge } from '@openai/apps-sdk-ui/components/Badge';
import type { Post } from '../../shared/types/posts.js';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="rounded-2xl border border-default bg-surface shadow-lg p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-default">{post.title}</h3>
          <Badge color="info">User {post.userId}</Badge>
        </div>

        <p className="text-sm text-default line-clamp-3">
          {post.body}
        </p>
      </div>
    </div>
  );
}
