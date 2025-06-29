import { CollectionConfig } from "payload";


const Contract: CollectionConfig = {
    slug: 'contracts',
    admin: {
        useAsTitle: 'title'
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'partiesInvolved',
            type: 'text',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: ['drafts', 'pending', 'approved', 'rejected'],
            defaultValue: 'draft',
        },
    ],
};

export default Contract;