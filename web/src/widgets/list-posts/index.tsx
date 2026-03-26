import React from 'react';
import { createRoot } from 'react-dom/client';
import { ListPosts } from './ListPosts.js';
import '@openai/apps-sdk-ui/css';
import '../../main.css';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <ListPosts />
    </React.StrictMode>
  );
}
