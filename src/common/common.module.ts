// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics', // endpoint de métricas
      customMetricPrefix: 'nestjs_', // prefixo automático nas métricas
      defaultMetrics: { enabled: false }, // desativa as métricas padrão
    }),
  ],
  exports: [PrometheusModule], // exporta pra outros módulos
})
export class CommonModule {}
