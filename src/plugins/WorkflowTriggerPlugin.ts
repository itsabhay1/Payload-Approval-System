import { Plugin } from 'payload';
import { CollectionAfterChangeHook } from 'payload';

const triggerWorkflow: CollectionAfterChangeHook = async ({ doc, collection, operation, req }) => {
  if (operation !== 'create' && operation !== 'update') return;

  try {
    const existingWorkflows = await req.payload.find({
      collection: 'workflows',
      where: {
        collectionSlug: { equals: collection.slug },
      },
    });

    if (!existingWorkflows?.docs?.length) return;

    const workflow = existingWorkflows.docs[0];
    const firstStep = workflow.steps?.[0];
    if (!firstStep) return;

    await req.payload.create({
      collection: 'workflow-logs',
      data: {
        workflowId: workflow.id,
        documentId: doc.id,
        collectionSlug: collection.slug,
        stepLabel: firstStep.label,
        action: 'commented',
        comment: 'Workflow started.',
        timestamp: new Date().toISOString(),
      },
    });

    console.log(` Workflow triggered for ${collection.slug}/${doc.id}`);
  } catch (err) {
    console.error(' Error in workflow trigger:', err);
  }
};

const WorkflowTriggerPlugin = (): Plugin => {
  return (config) => {
    const collectionsToWatch = ['blogs', 'contracts'];

    collectionsToWatch.forEach((slug) => {
      const collection = config.collections?.find((c) => c.slug === slug);
      if (collection) {
        collection.hooks = collection.hooks || {};
        collection.hooks.afterChange = [...(collection.hooks.afterChange || []), triggerWorkflow];
      }
    });

    return config;
  };
};

export default WorkflowTriggerPlugin;
