import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class NuevoEventoComponent implements OnInit, OnDestroy {

  archivoSeleccionado: File | null = null;
  imagenParaEliminar: string | null = null;
  imagenAmpliada: string | null = null;
  imagenesEventos: string[] = [];

  private suscripcion!: Subscription;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private eventosService: EventosServicios,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.suscripcion = this.eventosService.imagenesEventos$.subscribe(imagenes => {
      this.imagenesEventos = imagenes;
    });


  }

  ngOnDestroy() {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  async subirImagen() {
  if (!this.archivoSeleccionado) return;

  await this.eventosService.agregarImagen(this.archivoSeleccionado);

  // Limpiar estado
  this.archivoSeleccionado = null;
  this.fileInput.nativeElement.value = '';

  // Forzar detección de cambios para que Angular actualice la vista inmediatamente
  this.cdRef.detectChanges();
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

  moverImagenAHistorial(img: string) {
    this.eventosService.moverAHistorial(img);
    this.imagenParaEliminar = null; // Cierra modal si se usa confirmación
  }

}
