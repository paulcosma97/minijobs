import HeaderHandler from './header-handler.interface';

export default class LambdaHeaderHandler implements HeaderHandler {
    public readonly outgoingHeaders: { [headerName: string]: string } = {};

    constructor(private getEvent: () => AWSLambda.APIGatewayEvent) {}

    getHeader(name: string): string {
        return this.getEvent().headers[name] || '';
    }

    setHeader(name: string, value: string): void {
        this.outgoingHeaders[name] = value;
    }
}
