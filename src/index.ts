import "reflect-metadata";
import 'dotenv/config'
import {createConnection} from "typeorm";
import {App} from "./app";
import router from './routes'

createConnection().then(async connection =>
{
    const app = new App(router)
    await app.initRoutes()
    await app.listen()
}).catch(error => console.log("TypeORM connection error: ", error));
