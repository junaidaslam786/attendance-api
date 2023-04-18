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
import {Slip} from '../models';
import {SlipRepository} from '../repositories';

export class SlipController {
  constructor(
    @repository(SlipRepository)
    public slipRepository : SlipRepository,
  ) {}

  @post('/slips')
  @response(200, {
    description: 'Slip model instance',
    content: {'application/json': {schema: getModelSchemaRef(Slip)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slip, {
            title: 'NewSlip',
            exclude: ['id'],
          }),
        },
      },
    })
    slip: Omit<Slip, 'id'>,
  ): Promise<Slip> {
    return this.slipRepository.create(slip);
  }

  @get('/slips/count')
  @response(200, {
    description: 'Slip model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Slip) where?: Where<Slip>,
  ): Promise<Count> {
    return this.slipRepository.count(where);
  }

  @get('/slips')
  @response(200, {
    description: 'Array of Slip model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Slip, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Slip) filter?: Filter<Slip>,
  ): Promise<Slip[]> {
    return this.slipRepository.find(filter);
  }

  @patch('/slips')
  @response(200, {
    description: 'Slip PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slip, {partial: true}),
        },
      },
    })
    slip: Slip,
    @param.where(Slip) where?: Where<Slip>,
  ): Promise<Count> {
    return this.slipRepository.updateAll(slip, where);
  }

  @get('/slips/{id}')
  @response(200, {
    description: 'Slip model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Slip, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Slip, {exclude: 'where'}) filter?: FilterExcludingWhere<Slip>
  ): Promise<Slip> {
    return this.slipRepository.findById(id, filter);
  }

  @patch('/slips/{id}')
  @response(204, {
    description: 'Slip PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slip, {partial: true}),
        },
      },
    })
    slip: Slip,
  ): Promise<void> {
    await this.slipRepository.updateById(id, slip);
  }

  @put('/slips/{id}')
  @response(204, {
    description: 'Slip PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() slip: Slip,
  ): Promise<void> {
    await this.slipRepository.replaceById(id, slip);
  }

  @del('/slips/{id}')
  @response(204, {
    description: 'Slip DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.slipRepository.deleteById(id);
  }
}
