import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProyectoServices } from '../../services/proyectos.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { CategoriaProyecto } from '../../interface/categoria-proyecto.enum';

@Component({
  selector: 'app-draw-galeria',
  imports: [CommonModule, FormsModule],
  templateUrl: './Draw_Galeria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawGaleriaComponent {
  categoriasAbiertas = false;
  selectedCategoria: string | null = null;

  constructor(public proyectoService: ProyectoServices) {}

  toggleCategorias() {
    this.categoriasAbiertas = !this.categoriasAbiertas;
  }

  seleccionarCategoria(categoria: string) {
    // Alternar selección
    if (this.selectedCategoria === categoria) {
      this.selectedCategoria = null;
    } else {
      this.selectedCategoria = categoria;
    }

    // Avisar al servicio
    this.proyectoService.setCategoriaSeleccionada(this.selectedCategoria as CategoriaProyecto | null);
  }
}


