import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('data')
export class Data extends BaseEntity
{
    @PrimaryGeneratedColumn()
    public Id: number;
    @Column( {type: 'character varying', name: 'name', nullable: false, length: 150, unique: true})
    public Name:string;
    @Column({type: 'character varying', name: 'desc', length: 5000, default: 'NONE'})
    public Desc:string;
    @Column({type: 'character varying', name: 'lang', length: 100, default: 'NONE'})
    public Lang: string;
    @Column({type: "integer", name: 'star', default: 0})
    public Star: number;
    @Column({type: 'integer', name: 'forked', default: 0})
    public Forked: number;
    @Column({type: 'integer', name: 'starToday', default: 0})
    public StarToday: number;
}
