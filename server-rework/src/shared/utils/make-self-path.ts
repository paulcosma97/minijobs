import {Container} from 'typedi';
import {ServerPortToken} from '../request/express.interface';

export default function makeSelfPath(path: string): string {
    return `http://localhost:${Container.get(ServerPortToken)}${path}`;
}