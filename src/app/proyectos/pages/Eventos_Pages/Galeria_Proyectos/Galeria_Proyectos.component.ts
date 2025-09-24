import { CommonModule, formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoServices } from '../../../services/proyectos.services';
import { DrawGaleriaComponent } from "../../../components/Draw_Galeria/Draw_Galeria.component";
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { CategoriaProyecto } from '../../../interface/categoria-proyecto.enum';

@Component({
  selector: 'app-galeria-proyectos',
  imports: [CommonModule, FormsModule, DrawGaleriaComponent],
  templateUrl: './Galeria_Proyectos.component.html',
  styleUrl: './Galeria_Proyectos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GaleriaProyectosComponent implements OnInit {
  
  proyectos: ProyectoRegistrado[] = [];
  proyectosFiltrados: ProyectoRegistrado[] = [];
  proyectoSeleccionado: ProyectoRegistrado | null = null;
  categorias: CategoriaProyecto[] = [];
  selectedCategoria: CategoriaProyecto | null = null;

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
    // Cargar aprobados
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.proyectosFiltrados = [...this.proyectos];
    this.categorias = this.proyectoService.categorias;

    // Escuchar cambios de categoría
    this.proyectoService.categoriaSeleccionada$.subscribe(categoria => {
      this.selectedCategoria = categoria;
      if (categoria) {
        this.proyectosFiltrados = this.proyectos.filter(p => p.categoria === categoria);
      } else {
        this.proyectosFiltrados = [...this.proyectos];
      }
    });
  }

  seleccionarCategoria(categoria: CategoriaProyecto) {
    this.proyectoService.setCategoriaSeleccionada(categoria);
  }

  abrirModal(proyecto: ProyectoRegistrado) {
    this.proyectoSeleccionado = proyecto;
  }

  cerrarModal() {
    this.proyectoSeleccionado = null;
  }

  trackById(index: number, item: ProyectoRegistrado) {
    return item.id;
  }
}
