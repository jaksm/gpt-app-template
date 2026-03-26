import type { Meta, StoryObj } from '@storybook/react';
import { PostCard } from './PostCard.js';
import type { Post } from '../../shared/types/posts.js';

const meta = {
  title: 'Widgets/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const post: Post = {
  id: 1,
  title: 'Getting Started with MCP',
  body: 'The Model Context Protocol (MCP) enables powerful integrations between AI assistants and external tools. In this post, we explore the basics.',
  userId: 1,
};

export const Default: Story = {
  args: {
    post,
  },
};
