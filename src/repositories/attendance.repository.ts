import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Attendance, TemporaryExit, User} from '../models';
import {TemporaryExitRepository} from './temporary-exit.repository';
import {UserRepository} from './user.repository';

export class AttendanceRepository extends DefaultCrudRepository<
  Attendance,
  typeof Attendance.prototype.id
> {
  public readonly user: BelongsToAccessor<User, typeof Attendance.prototype.id>;

  public readonly temporaryExits: HasManyRepositoryFactory<
    TemporaryExit,
    typeof Attendance.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('TemporaryExitRepository')
    protected temporaryExitRepositoryGetter: Getter<TemporaryExitRepository>,
  ) {
    super(Attendance, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
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
