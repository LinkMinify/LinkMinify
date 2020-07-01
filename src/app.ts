import * as express from 'express';
import { Application } from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { ControllerBase } from './controllers/ControllerBase';
import HomeController from './controllers/HomeController';

// api routes
import DomainsApiController from './controllers/api/DomainsApiController';

class App {
    public app: Application;
    public port: string | number | boolean;

    constructor()
    {
        this.app = express();
        this.port = this.normalizePort(process.env.PORT || 5000);
    }

    public boot(): void {
        // initialize database
        this.initDatabae();

        // register middleware
        this.registerMiddleware();

        // register frontend controllers
        this.registerControllers();

        // register api controllers
        this.registerApiControllers();

        // listen
        this.listen();
    }

    private initDatabae() {
        // connect to mongo db
        (async () => {
            try {
                await mongoose.connect(process.env.MONGODB_URI, {
                    useNewUrlParser: true
                });

                mongoose.connection.on('error', err => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        });
    }

    /**
     * Register app middleware
     */
    private registerMiddleware() {
        this.app.use(morgan('common'));
        this.app.use(express.json());
    }

    private registerControllers() {
        this.registerController(new HomeController());
    }

    private registerApiControllers() {
        this.registerController(new DomainsApiController());
    }

    private registerController(controller: ControllerBase) {
        this.app.use('/', controller.router);
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`);
        })
    }

    private normalizePort(val: number|string): number|string|boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        } else if (port >= 0) {
            return port;
        } else {
            return false;
        }
    }
}

export default App;