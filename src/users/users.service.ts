import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge, Histogram, Summary } from 'prom-client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,

    @InjectMetric('user_operations_total')
    private readonly userOpsCounter: Counter<string>,

    @InjectMetric('users_active_current')
    private readonly usersActiveGauge: Gauge<string>,

    @InjectMetric('user_request_duration_seconds')
    private readonly requestDurationHistogram: Histogram<string>,

    @InjectMetric('user_request_latency_summary_seconds')
    private readonly requestLatencySummary: Summary<string>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const endHistogram = this.requestDurationHistogram.startTimer({ operation: 'create' });
    const endSummary = this.requestLatencySummary.startTimer({ operation: 'create' });
    try {
      const user = await this.prisma.user.upsert({
        where: { deviceToken: createUserDto.deviceToken },
        update: {},
        create: {
          deviceToken: createUserDto.deviceToken,
        },
      });

      this.userOpsCounter.inc({ operation: 'create', status: 'success' });
      this.usersActiveGauge.inc(); // usuário ativo aumentado
      endHistogram();
      endSummary();

      return user;
    } catch (error) {
      this.userOpsCounter.inc({ operation: 'create', status: 'error' });
      endHistogram();
      endSummary();
      throw error;
    }
  }

  async findAll() {
    const endHistogram = this.requestDurationHistogram.startTimer({ operation: 'findAll' });
    const endSummary = this.requestLatencySummary.startTimer({ operation: 'findAll' });
    try {
      const users = await this.prisma.user.findMany();

      this.userOpsCounter.inc({ operation: 'findAll', status: 'success' });
      endHistogram();
      endSummary();

      return users;
    } catch (error) {
      this.userOpsCounter.inc({ operation: 'findAll', status: 'error' });
      endHistogram();
      endSummary();
      throw error;
    }
  }

  async findOne(id: number) {
    const endHistogram = this.requestDurationHistogram.startTimer({ operation: 'findOne' });
    const endSummary = this.requestLatencySummary.startTimer({ operation: 'findOne' });
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      this.userOpsCounter.inc({ operation: 'findOne', status: 'success' });
      endHistogram();
      endSummary();

      return user;
    } catch (error) {
      this.userOpsCounter.inc({ operation: 'findOne', status: 'error' });
      endHistogram();
      endSummary();
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const endHistogram = this.requestDurationHistogram.startTimer({ operation: 'update' });
    const endSummary = this.requestLatencySummary.startTimer({ operation: 'update' });
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      this.userOpsCounter.inc({ operation: 'update', status: 'success' });
      endHistogram();
      endSummary();

      return updated;
    } catch (error) {
      this.userOpsCounter.inc({ operation: 'update', status: 'error' });
      endHistogram();
      endSummary();
      throw error;
    }
  }

  async remove(id: number) {
    const endHistogram = this.requestDurationHistogram.startTimer({ operation: 'remove' });
    const endSummary = this.requestLatencySummary.startTimer({ operation: 'remove' });
    try {
      const deleted = await this.prisma.user.delete({ where: { id } });

      this.userOpsCounter.inc({ operation: 'remove', status: 'success' });
      this.usersActiveGauge.dec(); // usuário ativo decrementado
      endHistogram();
      endSummary();

      return deleted;
    } catch (error) {
      this.userOpsCounter.inc({ operation: 'remove', status: 'error' });
      endHistogram();
      endSummary();
      throw error;
    }
  }
}
