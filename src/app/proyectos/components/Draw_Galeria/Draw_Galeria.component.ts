import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProyectoServices } from '../../services/proyectos.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-draw-galeria',
  imports: [CommonModule, FormsModule],
  templateUrl: './Draw_Galeria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawGaleriaComponent {categoriasAbiertas = false;

  toggleCategorias() {
    this.categoriasAbiertas = !this.categoriasAbiertas;
  }

  constructor(public proyectoService: ProyectoServices) {}

  selectedCategoria: string | null = null;

seleccionarCategoria(categoria: string) {
  if (this.selectedCategoria === categoria) {
    this.selectedCategoria = null;
  } else {
    this.selectedCategoria = categoria;
  }

}
}

