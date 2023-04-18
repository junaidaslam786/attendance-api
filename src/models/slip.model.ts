import {Entity, belongsTo, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Slip extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  userId: number;

  @property({
    type: 'date',
    required: true,
  })
  entryDate: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  entryTimestamp?: string;

  @property({
    type: 'string',
    required: true,
  })
  qrCode: string;

  constructor(data?: Partial<Slip>) {
    super(data);
  }
}
