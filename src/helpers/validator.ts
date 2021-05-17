import * as express from 'express';
import {Validator} from "class-validator";
import {ValidationError} from 'class-validator';

type Constructor<T> = {new(): T};

export function validate<T extends object>(type: Constructor<T>): express.RequestHandler 
{
    let validator = new Validator();

    return (req, res, next) => 
    {
        let input = Object.assign(new type(), req.body);

        let errors = validator.validateSync(input);
        if (errors.length > 0) 
        {
            next(errors);
        } 
        else 
        {
            req.body = input;
            next();
        }
    }
}

export function validationError(err: Error, req, res, next) 
{
    if (err instanceof Array && err[0] instanceof ValidationError) 
    {
        res.status(400).json({errors: err}).end();
    }
    else 
    {
        next(err);
    }
}
