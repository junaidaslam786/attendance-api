import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Attendance} from './attendance.model';
import {User} from './user.model';

@model()
export class TemporaryExit extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Attendance)
  attendanceId: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  reentryTimestamp?: string;

  constructor(data?: Partial<TemporaryExit>) {
    super(data);
  }
}
