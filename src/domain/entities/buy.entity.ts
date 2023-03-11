import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Buy {
  @PrimaryGeneratedColumn('uuid')
  mainId: string;
  
  @Column('text')
  id: string;

  @Column('text')
  idType: string;

  @Column({
    nullable: true,
    name: 'date',
    default: () => 'now()',
  })
  date: Date;

  @Column('text')
  clientName: string;

  @Column('numeric')
  quantity: number;

  @OneToOne(() => Product, (product) => product.id)
  @JoinColumn()
  productId: string;
}
