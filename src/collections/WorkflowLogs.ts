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
      admin: {
        description: 'Reference to the workflow that was triggered',
      },
    },
    {
      name: 'documentId',
      type: 'text',
      required: true,
      admin: {
        description: 'ID of the document involved in this workflow (e.g., Blog or Contract)',
        placeholder: 'Paste the related document ID here',
      },
    },
    {
      name: 'collectionSlug',
      type: 'text',
      required: true,
      admin: {
        description: 'Slug of the collection this log refers to (e.g., "blogs", "contracts")',
        placeholder: 'blogs',
      },
    },
    {
      name: 'stepLabel',
      type: 'text',
      required: true,
      admin: {
        description: 'Label of the workflow step completed',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'User who acted on this step (if any)',
      },
    },
    {
      name: 'action',
      type: 'select',
      options: ['approved', 'rejected', 'commented'],
      required: true,
      admin: {
        description: 'Action taken in the workflow step',
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      admin: {
        description: 'Optional comment added during this step',
      },
    },
    {
      name: 'timestamp',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        description: 'Date and time when this step was logged',
      },
    },
  ],
}

export default WorkflowLogs
