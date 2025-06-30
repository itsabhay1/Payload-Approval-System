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
    },
    {
      name: 'collectionSlug',
      type: 'select',
      required: true,
      options: ['blogs', 'contracts'],
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Approval Steps',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'assignedToRole',
          type: 'select',
          options: ['admin', 'reviewer', 'approver'], 
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: ['approve', 'review', 'sign', 'comment'],
          required: true,
        },
        {
            name: 'condition',
            type: 'text',
            admin: {
                description: 'Only fill this if you want this step to run based on a rule. For example: amount > 10000 or status === "pending". Leave it blank to always run.',
            },
            required: false,
        },
      ],
    },
  ],
};

export default workflow;
