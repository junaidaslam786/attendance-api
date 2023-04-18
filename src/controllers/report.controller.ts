import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {
  AttendanceRepository,
  SlipRepository,
  TemporaryExitRepository,
  UserRepository,
} from '../repositories';

export class ReportController {
  constructor(
    @repository(AttendanceRepository)
    public attendanceRepository: AttendanceRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(SlipRepository)
    public slipRepository: SlipRepository,
    @repository(TemporaryExitRepository)
    public temporaryExitRepository: TemporaryExitRepository,
  ) {}

  @get('/attendance-report')
  async attendanceReport(
    @param.query.date('start') start: string,
    @param.query.date('end') end: string,
  ) {
    // Generate a report of attendance data for the specified time period
    // This is just an example and you will need to implement the logic for generating the report based on your requirements
    const attendances = await this.attendanceRepository.find({
      where: {
        entryTimestamp: {
          between: [new Date(start).toISOString(), new Date(end).toISOString()],
        },
      },
    });
    return attendances;
  }

  @get('/user-summary/{userId}')
  async userSummary(@param.path.number('userId') userId: number) {
    const user = await this.userRepository.findById(userId);
    const attendances = await this.attendanceRepository.find({
      where: {userId},
    });
    const slips = await this.slipRepository.find({
      where: {userId},
    });
    return {
      user,
      attendances,
      slips,
    };
  }

  @get('/temporary-exit-requests')
  async temporaryExitRequests() {
    const temporaryExits = await this.temporaryExitRepository.find();
    return temporaryExits;
  }
}
