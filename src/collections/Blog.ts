import { CollectionConfig } from 'payload'

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
      admin: {
        description: 'Enter the blog post title',
        placeholder: 'e.g., Top 5 Tools for Developers',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Main content of the blog post',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check this to publish the blog post',
      },
    },
  ],
}

export default Blog
