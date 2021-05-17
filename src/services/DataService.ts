import {DataCreateDto} from "../dtos/DataCreateDto";
import {DataRepository} from "../repositories/DataRepository";
import {Data} from "../entity/Data";
import * as parser from '../helpers/parser'
import { DataUpdateDto } from "../dtos/DataUpdateDto";

export class DataService {
    private dataRepository: DataRepository
    private URL:string;
    
    constructor()
    {
        this.dataRepository = new DataRepository()
        this.URL = 'https://github.com/trending'
    }

    public async parse() : Promise<DataCreateDto[]>
    {
        const abs =  await parser.runParser(this.URL)
        await this.dataRepository.createMany(abs)
        return abs
    }

    public async updateDate(newData: DataUpdateDto) : Promise<Data>
    {
        return this.dataRepository.updateData(newData)
    }

    public async deleteData(id: number) : Promise<void>
    {
        return await this.dataRepository.deleteOne(id)
    }

    public async getAllData() : Promise<Data[]>
    {
        const data = await this.dataRepository.getAllData()
        return data
    }
}
