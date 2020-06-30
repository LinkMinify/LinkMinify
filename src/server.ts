import App from './app';
import * as dotenv from 'dotenv';

dotenv.config();

// boot our app
const app = new App();
app.boot();