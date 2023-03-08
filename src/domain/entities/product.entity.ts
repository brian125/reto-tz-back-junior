import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('numeric')
  inInventory: number;

  @Column('boolean')
  enabled: boolean;

  @Column('numeric')
  min: number;

  @Column('numeric')
  max: number;

}