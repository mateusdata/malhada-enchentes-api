import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  PrometheusModule,
  makeCounterProvider,
  makeGaugeProvider,
  makeHistogramProvider,
  makeSummaryProvider,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule],
  controllers: [UsersController],
  providers: [
    UsersService,

    // Contador de operações
    makeCounterProvider({
      name: 'user_operations_total',
      help: 'Número total de operações realizadas no UsersService',
      labelNames: ['operation', 'status'],
    }),

    // Gauge para usuários ativos
    makeGaugeProvider({
      name: 'users_active_current',
      help: 'Número atual de usuários ativos',
      labelNames: ['region'],
    }),

    // Histograma para duração de requisições
    makeHistogramProvider({
      name: 'user_request_duration_seconds',
      help: 'Duração das requisições ao UsersService em segundos',
      labelNames: ['operation'],
      buckets: [0.1, 0.5, 1, 2, 5],
    }),

    // Summary para latência de requisições
    makeSummaryProvider({
      name: 'user_request_latency_summary_seconds',
      help: 'Resumo da latência das requisições ao UsersService em segundos',
      labelNames: ['operation'],
    }),
  ],
})
export class UsersModule {}
