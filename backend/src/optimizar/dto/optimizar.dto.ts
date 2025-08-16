export interface ObjetoInversion {
  nombre: string;   
  peso: number;     
  ganancia: number; 
}

export interface OptimizarRequest {
  capacidad: number;
  objetos: ObjetoInversion[];
}

export interface OptimizarResponse {
  seleccionados: string[];
  ganancia_total: number;
  peso_total: number;
}
