import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosServicios } from '../../../services/eventos.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nuevo-evento',
  imports: [NavAdministrativoComponent,CommonModule, FormsModule ],
  templateUrl: './Nuevo_Evento.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevoEventoComponent implements OnInit, OnDestroy{
  archivoSeleccionado: File | null = null;
  imagenParaEliminar: string | null = null;
  imagenAmpliada: string | null = null;

  imagenesEventos: string[] = [];
  private suscripcion!: Subscription;

  constructor(
  private eventosService: EventosServicios,
  private cdr: ChangeDetectorRef
) {}

ngOnInit() {
  this.suscripcion = this.eventosService.imagenesEventos$.subscribe(imagenes => {
    this.imagenesEventos = imagenes;
    this.cdr.detectChanges(); // 👈 fuerza render si algo se "salta"
  });
}

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  async subirImagen() {
    if (!this.archivoSeleccionado) return;
    await this.eventosService.agregarImagen(this.archivoSeleccionado);
    this.archivoSeleccionado = null;
  }

  ampliarImagen(url: string) {
    this.imagenAmpliada = url;
  }

  cerrarImagenAmpliada() {
    this.imagenAmpliada = null;
  }

  confirmarEliminacion(url: string) {
    this.imagenParaEliminar = url;
  }

  cancelarEliminacion() {
    this.imagenParaEliminar = null;
  }

  eliminarImagenConfirmada() {
    if (!this.imagenParaEliminar) return;
    this.eventosService.eliminarImagen(this.imagenParaEliminar);
    this.imagenParaEliminar = null;
  }
}
