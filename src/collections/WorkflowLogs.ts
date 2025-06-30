import { CollectionConfig } from 'payload'

const WorkflowLogs: CollectionConfig = {
  slug: 'workflow-logs',
  admin: {
    useAsTitle: 'stepLabel',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: () => false, //immutable
  },
  fields: [
    {
      name: 'workflowId',
      type: 'relationship',
      relationTo: 'workflows',
      required: true,
    },
    {
      name: 'documentId',
      type: 'text',
      required: true,
    },
    {
      name: 'collectionSlug',
      type: 'text',
      required: true,
    },
    {
      name: 'stepLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'action',
      type: 'select',
      options: ['approved', 'rejected', 'commented'],
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'timestamp',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}

export default WorkflowLogs
