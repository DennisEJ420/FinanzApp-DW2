import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { PresupuestoService } from '../../core/services/presupuesto.service';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  presupuestoService = inject(PresupuestoService);

}