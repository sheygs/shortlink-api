import { Router } from 'express';
import ShortUrlController from '../controllers/url-shortener';

const ShortUrlRouter = Router();

ShortUrlRouter.route('/encode').post(ShortUrlController.encode);

ShortUrlRouter.route('/decode').get(ShortUrlController.decode);

export default ShortUrlRouter;
