import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { EventosServicios } from '../../../services/eventos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-histortial-eventos',
  imports: [NavAdministrativoComponent],
  templateUrl: './Histortial_Eventos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistortialEventosComponent implements OnInit{

  sub: Subscription = new Subscription();
  constructor(private eventosService: EventosServicios) {}
  modalAbierto = false;
  imagenSeleccionada: string | null = null;

  ngOnInit() {
  this.sub = this.eventosService.historialImagenes$.subscribe(historial => {
    this.historialImagenes = historial;
  });
  }

  imagenParaEliminar: string | null = null;
  historialImagenes: string[] = []; // aquí guardamos las imágenes enviadas al historial

  // método para mover imagen
  moverImagenAHistorial(img: string) {
    if (img) {
      this.historialImagenes.push(img); // agregar al historial
      this.imagenParaEliminar = null; // cerrar modal
    }
  }

  cancelarEliminacion() {
    this.imagenParaEliminar = null;
  }
    abrirModal(img: string) {
      this.imagenSeleccionada = img;
      this.modalAbierto = true;
    }
    cerrarModal() {
      this.modalAbierto = false;
      this.imagenSeleccionada = null;
    }
    eliminarImagenHistorial(img: string) {
    this.historialImagenes = this.historialImagenes.filter(i => i !== img);
    // También elimina de localStorage o llama al servicio que maneja historial
    this.eventosService.eliminarDelHistorial(img);
  }

 }
