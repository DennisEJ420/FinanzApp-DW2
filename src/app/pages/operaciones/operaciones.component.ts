import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-operaciones',
  imports: [NavbarComponent, RouterLink],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.css'
})
export class OperacionesComponent {

}