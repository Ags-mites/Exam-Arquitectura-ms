import { Module } from '@nestjs/common';
import { OptimizarController } from './optimizar.controller';
import { OptimizarService } from './optimizar.service';

@Module({
  controllers: [OptimizarController],
  providers: [OptimizarService],
})
export class OptimizarModule {}
