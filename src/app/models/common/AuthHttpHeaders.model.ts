
export class AuthHttpHeaders {

    public headers: {[key: string]: any};
    public auth: {[key: string]: any};
    public params: {[key: string]: any};

    constructor(a: {[key: string]: any}) {
        /*switch (this.type.toLocaleUpperCase()) {
            case 'POST':
            case 'PUT':
            case 'DELETE':
            case 'UPDATE':
            case 'CHANGE':
                this.headers = { 'Content-Type': 'application/json' };
                this.params = p;
                break;

            case 'GET':
                const h = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type'};
                this.params = p;
                this.headers  = {...h, ...p};
                break;

            default:
                this.headers = { 'Content-Type': 'application/json' };
                this.params = p;
                break;
            */

        const h = {
            'Content-Type': 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            'Accept': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
            'Access-Control-Allow-Origin': '*'
        };
        this.auth = a;
        this.headers  = {...h, ...a};
    }
}

