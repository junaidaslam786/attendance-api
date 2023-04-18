import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Attendance} from '../models';
import {AttendanceRepository} from '../repositories';

export class AttendanceController {
  constructor(
    @repository(AttendanceRepository)
    public attendanceRepository : AttendanceRepository,
  ) {}

  @post('/attendances')
  @response(200, {
    description: 'Attendance model instance',
    content: {'application/json': {schema: getModelSchemaRef(Attendance)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {
            title: 'NewAttendance',
            exclude: ['id'],
          }),
        },
      },
    })
    attendance: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    return this.attendanceRepository.create(attendance);
  }

  @get('/attendances/count')
  @response(200, {
    description: 'Attendance model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Attendance) where?: Where<Attendance>,
  ): Promise<Count> {
    return this.attendanceRepository.count(where);
  }

  @get('/attendances')
  @response(200, {
    description: 'Array of Attendance model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Attendance) filter?: Filter<Attendance>,
  ): Promise<Attendance[]> {
    return this.attendanceRepository.find(filter);
  }

  @patch('/attendances')
  @response(200, {
    description: 'Attendance PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {partial: true}),
        },
      },
    })
    attendance: Attendance,
    @param.where(Attendance) where?: Where<Attendance>,
  ): Promise<Count> {
    return this.attendanceRepository.updateAll(attendance, where);
  }

  @get('/attendances/{id}')
  @response(200, {
    description: 'Attendance model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Attendance, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Attendance, {exclude: 'where'}) filter?: FilterExcludingWhere<Attendance>
  ): Promise<Attendance> {
    return this.attendanceRepository.findById(id, filter);
  }

  @patch('/attendances/{id}')
  @response(204, {
    description: 'Attendance PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {partial: true}),
        },
      },
    })
    attendance: Attendance,
  ): Promise<void> {
    await this.attendanceRepository.updateById(id, attendance);
  }

  @put('/attendances/{id}')
  @response(204, {
    description: 'Attendance PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() attendance: Attendance,
  ): Promise<void> {
    await this.attendanceRepository.replaceById(id, attendance);
  }

  @del('/attendances/{id}')
  @response(204, {
    description: 'Attendance DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.attendanceRepository.deleteById(id);
  }
}
