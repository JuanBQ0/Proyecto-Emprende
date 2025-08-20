import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoServices } from '../../../services/proyectos.services';
import { Estudiante, Proyecto, ProyectoRegistrado } from '../../../interface/proyecto.interface';


@Component({
  selector: 'app-gestion-proyectos',
  imports: [NavAdministrativoComponent],
  templateUrl: './gestion-proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionProyectosComponent implements OnInit{

proyectos: ProyectoRegistrado[] = [];

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
  }

}
