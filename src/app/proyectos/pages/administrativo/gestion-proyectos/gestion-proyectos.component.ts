import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoServices } from '../../../services/proyectos.services';
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-proyectos',
  standalone: true,
  imports: [NavAdministrativoComponent, DatePipe],
  templateUrl: './gestion-proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionProyectosComponent implements OnInit {

  proyectos: ProyectoRegistrado[] = [];

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
  }

}
