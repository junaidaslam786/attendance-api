import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Attendance, TemporaryExit, User} from '../models';
import {AttendanceRepository} from './attendance.repository';
import {UserRepository} from './user.repository';

export class TemporaryExitRepository extends DefaultCrudRepository<
  TemporaryExit,
  typeof TemporaryExit.prototype.id
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof TemporaryExit.prototype.id
  >;

  public readonly attendance: BelongsToAccessor<
    Attendance,
    typeof TemporaryExit.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('AttendanceRepository')
    protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(TemporaryExit, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.attendance = this.createBelongsToAccessorFor(
      'attendance',
      attendanceRepositoryGetter,
    );
    this.registerInclusionResolver(
      'attendance',
      this.attendance.inclusionResolver,
    );
  }
}
