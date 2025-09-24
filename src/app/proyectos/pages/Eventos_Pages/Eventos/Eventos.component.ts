import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventosServicios } from '../../../services/eventos.service';

@Component({
  selector: 'Pages-eventos',
  imports: [],
  templateUrl: './Eventos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventosComponent {

  imagenesEventos: string[] = [];
  imagenAmpliada: string | null = null;

  constructor(private eventosService: EventosServicios) {}

  ngOnInit(): void {
    this.imagenesEventos = this.eventosService.obtenerImagenes();
  }

  abrirImagen(imagen: string): void {
    this.imagenAmpliada = imagen;
  }

  cerrarImagen(): void {
    this.imagenAmpliada = null;
  }
  
}
