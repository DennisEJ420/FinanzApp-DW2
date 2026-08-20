import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { PresupuestoService } from '../../core/services/presupuesto.service';


@Component({
  selector: 'app-agregar-gasto',
  imports: [FormsModule, NavbarComponent],
  templateUrl: './agregar-gasto.component.html',
  styleUrl: './agregar-gasto.component.css'
})
export class AgregarGastoComponent {


  presupuestoService = inject(PresupuestoService);

  //variables del input
  presupuestoId: number | null = null;
  categoria = '';
  monto: number | null = null;


  mensaje = '';
  mensajeError = '';


  agregarGasto(): void {


    this.mensaje = '';
    this.mensajeError = '';


    if (
      this.presupuestoId === null ||
      !this.categoria ||
      this.monto === null ||
      this.monto <= 0
    ) {
      this.mensajeError = 'Complete todos los campos correctamente.';
      return;
    }


    const resultado = this.presupuestoService.agregarGasto(
      this.presupuestoId,
      this.categoria,
      this.monto
    );


    if (!resultado) {
      this.mensajeError =
        'No se puede agregar el gasto. El monto supera el saldo disponible del presupuesto.';
      return;
    }


    this.mensaje = 'Gasto agregado correctamente.';


    this.presupuestoId = null;
    this.categoria = '';
    this.monto = null;
  }


}