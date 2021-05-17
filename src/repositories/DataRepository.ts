import {EntityRepository, Repository} from "typeorm";
import {Data} from "../entity/Data";
import {DataCreateDto} from "../dtos/DataCreateDto";
import { DataUpdateDto } from "../dtos/DataUpdateDto";

@EntityRepository(Data)
export class DataRepository extends Repository<Data> 
{

    public async createMany(newData: DataCreateDto[]): Promise<Data[]> 
    {
        const data: Data[] = []

        for (const temp of newData) 
        {
            const saveData = await Data.findOne({Name: temp.Name})
            if (saveData != null) 
            {
                await this.updateOne(saveData, temp)
            } 
            else
            {
                data.push(Object.assign(new Data(), temp))
            }
        }

        return await Data.save(data)
    }

    public async updateData(newData: DataUpdateDto): Promise<Data>
    {
        const data = await Data.findOne({Name: newData.Name})

        if (data != null)
        {
            return await this.updateOne(data, newData)
        }

        return data
    }

    public async deleteOne(id: number): Promise<void>
    {
        const data = await Data.findOne(id)

        if (data != null)
        {
            await Data.delete(data)
        }
    }

    public async getAllData(): Promise<Data[]>
    {
        const data = await Data.find()

        return data
    }

    private async updateOne(data: Data, newData: DataCreateDto) : Promise<Data>
    {
        if(data.Star !== newData.Star)
        {
            data.Star = newData.Star
        }
        if(data.StarToday !== newData.StarToday)
        {
            data.StarToday = newData.StarToday
        }
        if(data.Desc !== newData.Desc)
        {
            data.Desc = newData.Desc
        }
        if(data.Lang !== newData.Lang)
        {
            data.Lang = newData.Lang
        }
        if(data.Forked !== newData.Forked)
        {
            data.Forked = newData.Forked
        }
        await Data.save(data)
        return data
    }
}
