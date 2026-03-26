import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListPosts } from './ListPosts.js';
import type { Post } from '../../shared/types/posts.js';

describe('ListPosts', () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'Test Post Title',
      body: 'Test post body content',
      userId: 1,
    },
  ];

  beforeEach(() => {
    (window as typeof window & { openai: unknown }).openai = {
      toolOutput: { posts: mockPosts },
      toolInput: null,
      toolResponseMetadata: null,
      widgetState: null,
      theme: 'light',
      displayMode: 'inline',
      locale: 'en-US',
      setWidgetState: () => {},
      callTool: async () => {},
      openExternal: async () => {},
    };
  });

  it('should render posts from toolOutput', () => {
    render(<ListPosts />);
    expect(screen.getByText('Test Post Title')).toBeDefined();
  });

  it('should render nothing when toolOutput is null', () => {
    (window as typeof window & { openai: { toolOutput: null } }).openai.toolOutput = null;
    const { container } = render(<ListPosts />);
    expect(container.firstChild).toBeNull();
  });

  it('should show empty state when posts array is empty', () => {
    (window as typeof window & { openai: { toolOutput: { posts: [] } } }).openai.toolOutput = { posts: [] };
    render(<ListPosts />);
    expect(screen.getByText('No posts available at this time.')).toBeDefined();
  });
});
