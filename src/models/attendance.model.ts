import {
  Entity,
  belongsTo,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {TemporaryExit} from './temporary-exit.model';
import {User} from './user.model';

@model()
export class Attendance extends Entity {
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
    default: () => new Date(),
  })
  entryTimestamp?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['after_breakfast', 'after_lunch', 'after_dinner'],
    },
  })
  exitTimeOption: string;

  @property({
    type: 'date',
    required: true,
  })
  exitDate: string;

  @hasMany(() => TemporaryExit)
  temporaryExits: TemporaryExit[];

  constructor(data?: Partial<Attendance>) {
    super(data);
  }
}
