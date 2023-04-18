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
import {TemporaryExit} from '../models';
import {TemporaryExitRepository} from '../repositories';

export class TemporaryExitController {
  constructor(
    @repository(TemporaryExitRepository)
    public temporaryExitRepository : TemporaryExitRepository,
  ) {}

  @post('/temporary-exits')
  @response(200, {
    description: 'TemporaryExit model instance',
    content: {'application/json': {schema: getModelSchemaRef(TemporaryExit)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TemporaryExit, {
            title: 'NewTemporaryExit',
            exclude: ['id'],
          }),
        },
      },
    })
    temporaryExit: Omit<TemporaryExit, 'id'>,
  ): Promise<TemporaryExit> {
    return this.temporaryExitRepository.create(temporaryExit);
  }

  @get('/temporary-exits/count')
  @response(200, {
    description: 'TemporaryExit model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TemporaryExit) where?: Where<TemporaryExit>,
  ): Promise<Count> {
    return this.temporaryExitRepository.count(where);
  }

  @get('/temporary-exits')
  @response(200, {
    description: 'Array of TemporaryExit model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TemporaryExit, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TemporaryExit) filter?: Filter<TemporaryExit>,
  ): Promise<TemporaryExit[]> {
    return this.temporaryExitRepository.find(filter);
  }

  @patch('/temporary-exits')
  @response(200, {
    description: 'TemporaryExit PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TemporaryExit, {partial: true}),
        },
      },
    })
    temporaryExit: TemporaryExit,
    @param.where(TemporaryExit) where?: Where<TemporaryExit>,
  ): Promise<Count> {
    return this.temporaryExitRepository.updateAll(temporaryExit, where);
  }

  @get('/temporary-exits/{id}')
  @response(200, {
    description: 'TemporaryExit model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TemporaryExit, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TemporaryExit, {exclude: 'where'}) filter?: FilterExcludingWhere<TemporaryExit>
  ): Promise<TemporaryExit> {
    return this.temporaryExitRepository.findById(id, filter);
  }

  @patch('/temporary-exits/{id}')
  @response(204, {
    description: 'TemporaryExit PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TemporaryExit, {partial: true}),
        },
      },
    })
    temporaryExit: TemporaryExit,
  ): Promise<void> {
    await this.temporaryExitRepository.updateById(id, temporaryExit);
  }

  @put('/temporary-exits/{id}')
  @response(204, {
    description: 'TemporaryExit PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() temporaryExit: TemporaryExit,
  ): Promise<void> {
    await this.temporaryExitRepository.replaceById(id, temporaryExit);
  }

  @del('/temporary-exits/{id}')
  @response(204, {
    description: 'TemporaryExit DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.temporaryExitRepository.deleteById(id);
  }
}
