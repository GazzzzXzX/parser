import * as express from 'express'
import * as bodyParser from "body-parser";
import * as cors from 'cors'
import {Request, Response} from "express";
import {validationError} from "./helpers/validator";

export class App
{
    public app: express.Application
    public httpServer: any
    public routes: any

    constructor(routes)
    {
        this.app = express()
        this.initializeMiddleware()
        this.routes = routes
    }

    public listen()
    {
        this.httpServer = this.app.listen(process.env.PORT || 4001,
            () => 
            {
                console.log(`http://${process.env.HOST}:${process.env.PORT}`)
            })
    }

    public async initRoutes()
    {
        this.app.use('/', this.routes)
    }

    private initializeMiddleware()
    {
        this.app.use(bodyParser.json({ limit: '1mb'}))
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use('*', cors())
        this.app.use(validationError)
    }
}
