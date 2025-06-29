import { CollectionConfig } from 'payload';

const Blog: CollectionConfig = {
      slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};


export default Blog;