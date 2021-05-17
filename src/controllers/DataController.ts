import {DataCreateDto} from "../dtos/DataCreateDto";
import {DataService} from "../services/DataService";
import {Request, Response} from "express";
import { DataUpdateDto } from "../dtos/DataUpdateDto";

export class DataController
{
    public async parse(request: Request, response: Response)
    {
        const dataService = new DataService()
        await dataService.parse()

        response.status(201).send({})
    }

    public async updateData(request: Request, response: Response)
    {
        const dataService = new DataService()
        const body: DataUpdateDto = request.body
        const result = await dataService.updateDate(body)

        response.status(200).send({})
    }

    public async deleteData(request: Request, response: Response)
    {
        const dataService = new DataService()
        const parapms: number = Number(request.params.id)
        if (parapms != null)
        {
            const result = await dataService.deleteData(parapms)
        }
        else
        {
            response.status(400).send({})
        }
        response.status(204).send({})
    }

    public async getAllData(request: Request, response: Response)
    {
        const dataService = new DataService()
        const result = await  dataService.getAllData()

        response.send(result)
    }
}
