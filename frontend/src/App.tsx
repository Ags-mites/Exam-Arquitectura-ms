import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ObjetoInversion {
  nombre: string;
  peso: number;
  ganancia: number;
}

interface Resultado {
  seleccionados: string[];
  ganancia_total: number;
  peso_total: number;
}

function App() {
  const [capacidad, setCapacidad] = useState(10000);
  const [objetos, setObjetos] = useState<ObjetoInversion[]>([
    { nombre: "Fondo_A", peso: 2000, ganancia: 1500 },
    { nombre: "Fondo_B", peso: 4000, ganancia: 3500 },
    { nombre: "Fondo_C", peso: 5000, ganancia: 4000 },
    { nombre: "Fondo_D", peso: 3000, ganancia: 2500 },
    { nombre: "Fondo_E", peso: 1500, ganancia: 1800 },
  ]);
  const [result, setResult] = useState<Resultado | null>(null);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const addRow = () =>
    setObjetos([...objetos, { nombre: "", peso: 0, ganancia: 0 }]);
  
  const removeRow = (idx: number) =>
    setObjetos(objetos.filter((_, i) => i !== idx));
  
  const updateField = (idx: number, field: string, value: string | number) => {
    const copy = [...objetos];
    if (field === "nombre") {
      copy[idx].nombre = value as string;
    } else if (field === "peso") {
      copy[idx].peso = Number(value || 0);
    } else if (field === "ganancia") {
      copy[idx].ganancia = Number(value || 0);
    }
    setObjetos(copy);
  };

  const calcular = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/optimizar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capacidad: Number(capacidad || 0), objetos }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Error al calcular");
    } finally {
      setLoading(false);
    }
  };

  const limpiar = () => {
    setCapacidad(0);
    setObjetos([]);
    setResult(null);
  };

  const cargarEjemplo = () => {
    setCapacidad(10000);
    setObjetos([
      { nombre: "Fondo_A", peso: 2000, ganancia: 1500 },
      { nombre: "Fondo_B", peso: 4000, ganancia: 3500 },
      { nombre: "Fondo_C", peso: 5000, ganancia: 4000 },
      { nombre: "Fondo_D", peso: 3000, ganancia: 2500 },
      { nombre: "Fondo_E", peso: 1500, ganancia: 1800 },
    ]);
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Optimizador de Portafolio</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Capacidad (Presupuesto)</label>
              <Input
                type="number"
                value={capacidad}
                onChange={(e) => setCapacidad(Number(e.target.value))}
                placeholder="Capacidad"
                className="w-48"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addRow} variant="outline">
                Agregar proyecto
              </Button>
              <Button onClick={cargarEjemplo} variant="outline">
                Cargar ejemplo
              </Button>
              <Button onClick={calcular} disabled={loading}>
                {loading ? "Calculando..." : "Calcular"}
              </Button>
              <Button onClick={limpiar} variant="destructive">
                Limpiar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos de Inversión</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proyecto</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>Ganancia</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {objetos.map((o, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Input
                      value={o.nombre}
                      onChange={(e) => updateField(idx, "nombre", e.target.value)}
                      placeholder="Nombre del proyecto"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={o.peso}
                      onChange={(e) => updateField(idx, "peso", e.target.value)}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={o.ganancia}
                      onChange={(e) =>
                        updateField(idx, "ganancia", e.target.value)
                      }
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeRow(idx)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">
              Resultados de la Optimización
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Proyectos Seleccionados</p>
                <div className="flex flex-wrap gap-1">
                  {result.seleccionados?.length > 0 
                    ? result.seleccionados.map((proyecto, idx) => (
                        <Badge key={idx} variant="secondary">
                          {proyecto}
                        </Badge>
                      ))
                    : <span className="text-muted-foreground">Ninguno</span>
                  }
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Ganancia Total</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  ${result.ganancia_total?.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Peso Total</p>
                <p className="text-lg font-semibold">
                  ${result.peso_total?.toLocaleString()} / ${capacidad.toLocaleString()}
                </p>
              </div>
            </div>
          
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
