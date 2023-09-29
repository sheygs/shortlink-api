import { Router } from 'express';

const ShortLinkRouter = Router();

// eslint-disable-next-line spaced-comment
ShortLinkRouter.route('/encode').post(/*ShortLinkController.encode*/);
// eslint-disable-next-line spaced-comment
ShortLinkRouter.route('/decode').post(/*ShortLinkController.decode*/);

export default ShortLinkRouter;
