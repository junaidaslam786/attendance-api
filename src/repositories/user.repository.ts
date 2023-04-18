import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Attendance, Slip, TemporaryExit, User} from '../models';
import {AttendanceRepository} from './attendance.repository';
import {SlipRepository} from './slip.repository';
import {TemporaryExitRepository} from './temporary-exit.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public readonly attendances: HasManyRepositoryFactory<
    Attendance,
    typeof User.prototype.id
  >;

  public readonly slips: HasManyRepositoryFactory<
    Slip,
    typeof User.prototype.id
  >;

  public readonly temporaryExits: HasManyRepositoryFactory<
    TemporaryExit,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
    @repository.getter('SlipRepository')
    protected slipRepositoryGetter: Getter<SlipRepository>,
    @repository.getter('TemporaryExitRepository')
    protected temporaryExitRepositoryGetter: Getter<TemporaryExitRepository>,
  ) {
    super(User, dataSource);
    this.attendances = this.createHasManyRepositoryFactoryFor(
      'attendances',
      attendanceRepositoryGetter,
    );
    this.registerInclusionResolver(
      'attendances',
      this.attendances.inclusionResolver,
    );
    this.slips = this.createHasManyRepositoryFactoryFor(
      'slips',
      slipRepositoryGetter,
    );
    this.registerInclusionResolver('slips', this.slips.inclusionResolver);
    this.temporaryExits = this.createHasManyRepositoryFactoryFor(
      'temporaryExits',
      temporaryExitRepositoryGetter,
    );
    this.registerInclusionResolver(
      'temporaryExits',
      this.temporaryExits.inclusionResolver,
    );
  }
}
