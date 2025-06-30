import { CollectionConfig } from 'payload'

const workflow: CollectionConfig = {
  slug: 'workflows',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'A unique name for this workflow',
        placeholder: 'e.g., Blog Approval Flow',
      },
    },
    {
      name: 'collectionSlug',
      type: 'select',
      required: true,
      options: ['blogs', 'contracts'],
      admin: {
        description: 'Select the collection this workflow applies to',
      },
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Approval Steps',
      admin: {
        description: 'Define the sequence of approval steps',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Review, Legal Check',
          },
        },
        {
          name: 'assignedToRole',
          type: 'select',
          options: ['admin', 'reviewer', 'approver'],
          required: true,
          admin: {
            description: 'Who will handle this step',
          },
        },
        {
          name: 'type',
          type: 'select',
          options: ['approve', 'review', 'sign', 'comment'],
          required: true,
          admin: {
            description: 'Action type required for this step',
          },
        },
        {
          name: 'condition',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional rule to run this step (e.g., status === "pending")',
            placeholder: 'amount > 10000',
          },
        },
      ],
    },
  ],
};

export default workflow;
