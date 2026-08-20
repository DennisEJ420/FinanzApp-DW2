import { Injectable, inject, signal } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';
import { Gasto } from '../models/gasto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  private readonly STORAGE_KEY = 'finanzapp_presupuestos';

  private localStorageService = inject(LocalStorageService);

  private presupuestos = signal<Presupuesto[]>(
    this.cargarPresupuestos()
  );

  readonly presupuestos$ = this.presupuestos.asReadonly();

  //lee los datos iniciales desde el navegador
  private cargarPresupuestos(): Presupuesto[] {
    return this.localStorageService.obtener<Presupuesto[]>(
      this.STORAGE_KEY
    ) ?? [];
  }

  //guarda la lista actual en LS
  private guardarPresupuestos(): void {
    this.localStorageService.guardar(
      this.STORAGE_KEY,
      this.presupuestos()
    );
  }

  //crea y añade un nuevo presupuesto a la lista
  crearPresupuesto(
    nombre: string,
    mes: string,
    monto: number
  ): void {
    const nuevoPresupuesto: Presupuesto = {
      id: Date.now(),
      nombre,
      mes,
      monto,
      gastos: []
    };

    this.presupuestos.update(presupuestos => [
      ...presupuestos,
      nuevoPresupuesto
    ]);

    this.guardarPresupuestos();
  }

  //busca presupuesto por su ID
  obtenerPresupuesto(id: number): Presupuesto | undefined {
    return this.presupuestos().find(
      presupuesto => presupuesto.id === id
    );
  }

  agregarGasto(
    presupuestoId: number,
    categoria: string,
    monto: number
  ): boolean {
    const presupuesto = this.obtenerPresupuesto(presupuestoId);

    if (!presupuesto) {
      return false;
    }

    const gastado = this.obtenerTotalGastado(presupuesto);

    //valida que el nuevo gasto no exceda el monto atual
    if (gastado + monto > presupuesto.monto) {
      return false;
    }

    const nuevoGasto: Gasto = {
      id: Date.now(),
      categoria,
      monto
    };

    //actualiza el presupuesto
    this.presupuestos.update(presupuestos =>
      presupuestos.map(p =>
        p.id === presupuestoId
          ? {
              ...p,
              gastos: [...p.gastos, nuevoGasto]
            }
          : p
      )
    );

    this.guardarPresupuestos();

    return true;
  }

  //suma de los gastos de un presupuesto
  obtenerTotalGastado(presupuesto: Presupuesto): number {
    return presupuesto.gastos.reduce(
      (total, gasto) => total + gasto.monto,
      0
    );
  }

  //calcula el restante disponible
  obtenerSaldo(presupuesto: Presupuesto): number {
    return presupuesto.monto -
      this.obtenerTotalGastado(presupuesto);
  }

  //comprueba el saldo
  estaAgotado(presupuesto: Presupuesto): boolean {
    return this.obtenerSaldo(presupuesto) <= 0;
  }


  //obtiene los datos para mostrar las metricas del dashboard
obtenerCantidadPresupuestos(): number {
  return this.presupuestos().length;
}

obtenerCantidadAgotados(): number {
  return this.presupuestos().filter(
    presupuesto => this.estaAgotado(presupuesto)
  ).length;
}

obtenerMesPresupuestoMasAlto(): string {

  if (this.presupuestos().length === 0) {
    return 'Sin datos';
  }

  const presupuestoMayor = this.presupuestos().reduce(
    (mayor, presupuesto) =>
      presupuesto.monto > mayor.monto
        ? presupuesto
        : mayor
  );

  return presupuestoMayor.mes;
}

obtenerCategoriaMayorConsumo(): string {

  const consumoPorCategoria: Record<string, number> = {};

  for (const presupuesto of this.presupuestos()) {

    for (const gasto of presupuesto.gastos) {

      if (consumoPorCategoria[gasto.categoria]) {
        consumoPorCategoria[gasto.categoria] += gasto.monto;
      } else {
        consumoPorCategoria[gasto.categoria] = gasto.monto;
      }

    }

  }

  const categorias = Object.entries(consumoPorCategoria);

  if (categorias.length === 0) {
    return 'Sin datos';
  }

  const categoriaMayor = categorias.reduce(
    (mayor, categoria) =>
      categoria[1] > mayor[1]
        ? categoria
        : mayor
  );

  return categoriaMayor[0];
}
}