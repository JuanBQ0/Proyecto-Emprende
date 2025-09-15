import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoServices } from '../../../services/proyectos.services';
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { DrawGaleriaComponent } from "../../../components/Draw_Galeria/Draw_Galeria.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-proyectos',
  standalone: true,
  imports: [NavAdministrativoComponent, DatePipe, DrawGaleriaComponent, CommonModule, FormsModule],
  templateUrl: './gestion-proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionProyectosComponent implements OnInit {

  proyectos: ProyectoRegistrado[] = [];
mostrarFiltros: any;

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
  }

}
