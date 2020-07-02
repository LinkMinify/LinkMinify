import * as express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import { ControllerBase } from './controllers/ControllerBase';

// front end controllers
import HomeController from './controllers/HomeController';
import LinksController from './controllers/LinksController';

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
        this.registerFrontendControllers();

        // register api controllers
        this.registerApiControllers();

        // finally, register our error handler
        this.registerErrorHandler();

        // listen
        this.listen();
    }

    private initDatabae() {
        // connect to mongo db
        try {
            mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true
            });

            mongoose.connection.on('connected', () => {
                console.log('Connected to mongodb');
            })

            mongoose.connection.on('error', err => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Register app middleware
     */
    private registerMiddleware() {
        this.app.use(morgan('common'));
        this.app.use(express.json());
    }

    private registerFrontendControllers() {
        this.registerController(new HomeController());
        this.registerController(new LinksController());
    }

    private registerApiControllers() {
        this.registerController(new DomainsApiController());
    }

    private registerController(controller: ControllerBase) {
        this.app.use('/', controller.router);
    }

    private registerErrorHandler() {
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            if (error.status) {
                res.status(error.status);
            } else {
                res.status(500);
            }
            
            res.json({
                success: false,
                result: error.message
            });
        });
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