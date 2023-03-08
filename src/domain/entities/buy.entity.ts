import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Buy {
  @PrimaryColumn('text', {
    unique: true,
  })
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
