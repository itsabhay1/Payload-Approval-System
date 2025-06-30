import { Endpoint } from 'payload';
import payload from 'payload';

const workflowRoutes: Endpoint[] = [
  {
    path: '/api/workflows/trigger',
    method: 'post',
    handler: async ({ req, res, next }: any) => {
      try {
        const { collectionSlug, documentId } = req.body;

        if (!collectionSlug || !documentId) {
          return res.status(400).json({ error: 'collectionSlug and documentId are required.' });
        }

        const doc = await payload.findByID({
          collection: collectionSlug,
          id: documentId,
        });

        const workflows = await payload.find({
          collection: 'workflows',
          where: {
            collectionSlug: { equals: collectionSlug },
          },
        });

        if (!workflows.docs.length) {
          return res.status(404).json({ error: 'No workflow found for this collection.' });
        }

        const workflow = workflows.docs[0];
        const firstStep = workflow.steps?.[0];

        if (!firstStep) {
          return res.status(400).json({ error: 'Workflow has no steps.' });
        }

        const log = await payload.create({
          collection: 'workflow-logs',
          data: {
            workflowId: workflow.id,
            documentId: doc.id,
            collectionSlug,
            stepLabel: firstStep.label,
            action: 'commented',
            comment: 'Workflow manually triggered.',
            timestamp: new Date().toISOString(),
          },
        });

        return res.status(200).json({ message: 'Workflow triggered', log });
      } catch (err) {
        next(err);
      }
    },
  },
  {
    path: '/api/workflows/status/:docId',
    method: 'get',
    handler: async ({ req, res, next }: any) => {
      try {
        const { docId } = req.params;

        const logs = await payload.find({
          collection: 'workflow-logs',
          where: {
            documentId: { equals: docId },
          },
          depth: 1,
        });

        if (!logs.docs.length) {
          return res.status(404).json({ error: 'No workflow logs found for this document.' });
        }

        return res.status(200).json({
          stepsCompleted: logs.docs.map((log) => ({
            step: log.stepLabel,
            action: log.action,
            comment: log.comment,
            timestamp: log.timestamp,
          })),
        });
      } catch (err) {
        next(err);
      }
    },
  },
];

export default workflowRoutes;
