import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";

@Component({
  selector: 'app-reporte-proyectos',
  imports: [NavAdministrativoComponent],
  templateUrl: './reporte-proyectos.component.html',
  styleUrl: './reporte-proyectos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteProyectosComponent {


}
