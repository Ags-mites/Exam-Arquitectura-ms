import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptimizarService } from './optimizar.service';
import type { OptimizarRequest, OptimizarResponse } from './dto/optimizar.dto';

@ApiTags('optimizar')
@Controller('optimizar')
export class OptimizarController {
  constructor(private readonly service: OptimizarService) {}

  @Post()
  @ApiBody({
    schema: {
      example: {
        capacidad: 8000,
        objetos: [
          { nombre: 'Accion_X', peso: 1000, ganancia: 800 },
          { nombre: 'Accion_Y', peso: 2500, ganancia: 2200 },
          { nombre: 'Accion_Z', peso: 3000, ganancia: 2800 },
          { nombre: 'Bono_P', peso: 4000, ganancia: 3000 },
          { nombre: 'Bono_Q', peso: 1500, ganancia: 1200 }
        ],
      },
    },
  })
  optimizar(@Body() body: OptimizarRequest): OptimizarResponse {
    return this.service.optimizar(body);
  }
}
