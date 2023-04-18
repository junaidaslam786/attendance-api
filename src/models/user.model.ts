import {Entity, hasMany, model, property} from '@loopback/repository';
import {Attendance} from './attendance.model';
import {Slip} from './slip.model';
import {TemporaryExit} from './temporary-exit.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  cnic: string;

  @property({
    type: 'string',
    required: true,
  })
  mobileNumber: string;

  // Additional properties
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  fathersName: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  zone: string;

  @property({
    type: 'string',
    required: true,
  })
  region: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  designation: string;

  @property({
    type: 'string',
    required: true,
  })
  administrativeResponsibility: string;

  @hasMany(() => Attendance)
  attendances: Attendance[];

  @hasMany(() => Slip)
  slips: Slip[];

  @hasMany(() => TemporaryExit)
  temporaryExits: TemporaryExit[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}
