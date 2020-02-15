import { Service } from 'typedi';
import AbstractExpressRouter from '../../../../shared/router/express.router';

@Service()
export default class RequiredJobsRouter extends AbstractExpressRouter {
    constructor() {
        super('/jobs/required');
    }
}
