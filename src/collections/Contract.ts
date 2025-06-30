import { CollectionConfig } from "payload";


const Contract: CollectionConfig = {
  slug: 'contracts',
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
        description: 'Title of the contract',
        placeholder: 'e.g., Service Agreement',
      },
    },
    {
      name: 'partiesInvolved',
      type: 'text',
      required: true,
      admin: {
        description: 'Parties involved in this contract',
        placeholder: 'e.g., Harsh And Krishna',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['drafts', 'pending', 'approved', 'rejected'],
      defaultValue: 'draft',
      admin: {
        description: 'Current status of the contract',
      },
    },
  ],
};

export default Contract;