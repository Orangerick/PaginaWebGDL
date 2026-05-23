import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: import.meta.env.VITE_GHOST_API_URL || 'https://demo.ghost.io',
  key: import.meta.env.VITE_GHOST_CONTENT_API_KEY || '22444f78447b96c402283737ad',
  version: "v5.0"
});

export const ghostService = {
  getPosts: async () => {
    try {
      return await api.posts.browse({
        limit: "all",
        include: ['tags', 'authors']
      });
    } catch (err) {
      console.error('Error fetching Ghost posts:', err);
      return [];
    }
  },

  getPostBySlug: async (slug: string) => {
    try {
      return await api.posts.read({ slug }, { include: ['tags', 'authors'] });
    } catch (err) {
      console.error('Error fetching Ghost post details:', err);
      return null;
    }
  }
};
