import { Gasto } from './gasto';

export interface Presupuesto {
    id: number;
    nombre: string;
    mes: string;
    monto: number;
    gastos: Gasto[];
}