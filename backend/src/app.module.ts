import { Module } from '@nestjs/common';
import { OptimizarModule } from './optimizar/optimizar.module';

@Module({
  imports: [OptimizarModule],
})
export class AppModule {}
