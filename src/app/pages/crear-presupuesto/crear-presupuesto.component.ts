import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { PresupuestoService } from '../../core/services/presupuesto.service';

@Component({
  selector: 'app-crear-presupuesto',
  imports: [FormsModule, NavbarComponent],
  templateUrl: './crear-presupuesto.component.html',
  styleUrl: './crear-presupuesto.component.css'
})
export class CrearPresupuestoComponent {

  presupuestoService = inject(PresupuestoService);
  // variables para contenido recibido del usuario
  nombre = '';
  mes = '';
  monto: number | null = null;

  crearPresupuesto(): void {
  //validación de los datos
    if (
      !this.nombre.trim() ||
      !this.mes ||
      this.monto === null ||
      this.monto <= 0
    ) {
      return;
    }

    this.presupuestoService.crearPresupuesto(
      this.nombre,
      this.mes,
      this.monto
    );

    this.nombre = '';
    this.mes = '';
    this.monto = null;
  }

}