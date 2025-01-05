import { BaseServer } from '@radoslavirha/tsed-platform';

export class Server extends BaseServer {
    $beforeRoutesInit(): void {
        this.registerMiddlewares();
    }
}
