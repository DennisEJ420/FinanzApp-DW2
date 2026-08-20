import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { OperacionesComponent } from './pages/operaciones/operaciones.component';
import { CrearPresupuestoComponent } from './pages/crear-presupuesto/crear-presupuesto.component';
import { AgregarGastoComponent } from './pages/agregar-gasto/agregar-gasto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    //rutas para acceder a cada pagina
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'operaciones',
        component: OperacionesComponent
    },
    {
        path: 'crear-presupuesto',
        component: CrearPresupuestoComponent
    },
    {
        path: 'agregar-gasto',
        component: AgregarGastoComponent
    },
    {
        path: '**', //Si la direccion no existe redirige al inicio
        redirectTo: ''
    }
];