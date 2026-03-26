import type { Meta, StoryObj } from '@storybook/react';
import { ListPosts } from './ListPosts.js';
import { mockPosts } from './mocks/posts.js';

const meta = {
  title: 'Widgets/ListPosts',
  component: ListPosts,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ListPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    openai: {
      toolOutput: {
        posts: mockPosts,
      },
    },
  },
};
