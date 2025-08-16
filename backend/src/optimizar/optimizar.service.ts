import { Injectable } from '@nestjs/common';
import { OptimizarRequest, OptimizarResponse } from './dto/optimizar.dto';

@Injectable()
export class OptimizarService {
  optimizar(payload: OptimizarRequest): OptimizarResponse {
    const capacidad = Math.max(0, Math.floor(payload.capacidad || 0));
    const objetos = Array.isArray(payload.objetos) ? payload.objetos : [];

    const n = objetos.length;
    const W = capacidad - 1;

    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      const { peso, ganancia } = objetos[i - 1];
      const wi = Math.max(0, Math.floor(peso));
      const vi = Math.max(0, Math.floor(ganancia));
      for (let w = 0; w <= W; w++) {
        dp[i][w] = dp[i - 1][w];
        if (wi <= w) {
          const take = dp[i - 1][w - wi] + vi;
          if (take > dp[i][w]) dp[i][w] = take;
        }
      }
    }

    let w = W;
    const seleccionados: string[] = [];
    let peso_total = 0;
    for (let i = n; i >= 1; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        const obj = objetos[i - 1];
        seleccionados.push(obj.nombre);
        w -= Math.max(0, Math.floor(obj.peso));
        peso_total += Math.max(0, Math.floor(obj.peso));
      }
    }
    seleccionados.reverse();

    return {
      seleccionados,
      ganancia_total: dp[n][W],
      peso_total,
    };
  }
}
