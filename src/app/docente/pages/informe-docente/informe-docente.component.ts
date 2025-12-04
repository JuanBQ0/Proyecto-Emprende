import { Component, OnInit } from '@angular/core';
import { NavbarDocenteComponent } from "../../components/navbar-docente/navbar-docente.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Informe {
  nombre: string;
  descripcion: string;
  fecha: Date;
  archivo: File;
}

@Component({
  selector: 'app-informe-docente',
  imports: [NavbarDocenteComponent, FormsModule, CommonModule],
  templateUrl: './informe-docente.component.html',
  styleUrl: './informe-docente.component.css'
})
export class InformeDocenteComponent implements OnInit {
  tab: 'docente' | 'trimestral' = 'docente';

  archivoDocente: File | null = null;
  descripcionDocente = '';
  fechaDocente?: string; // fecha simulada desde el formulario
  informesDocente: Informe[] = [];

  archivoTrimestral: File | null = null;
  descripcionTrimestral = '';
  fechaTrimestral?: string; // fecha simulada
  informesTrimestrales: Informe[] = [];

  // Filtro por fecha
  filtroInicio?: string;
  filtroFin?: string;

  ngOnInit(): void {
    this.cargarInformes();
  }

  // Archivos
  onArchivoDocenteSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoDocente = input.files?.[0] ?? null;
  }

  onArchivoTrimestralSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoTrimestral = input.files?.[0] ?? null;
  }

  // Subida con fecha opcional desde input
  subirInformeDocente() {
    if (!this.archivoDocente) return;

    const fecha = this.fechaDocente ? new Date(this.fechaDocente) : new Date();

    const nuevoInforme: Informe = {
      nombre: this.archivoDocente.name,
      descripcion: this.descripcionDocente,
      fecha,
      archivo: this.archivoDocente
    };

    this.informesDocente.push(nuevoInforme);
    localStorage.setItem('informesDocente', JSON.stringify(this.informesDocente));

    // limpiar formulario
    this.descripcionDocente = '';
    this.archivoDocente = null;
    this.fechaDocente = undefined;
  }

  subirInformeTrimestral() {
    if (!this.archivoTrimestral) return;

    const fecha = this.fechaTrimestral ? new Date(this.fechaTrimestral) : new Date();

    const nuevoInforme: Informe = {
      nombre: this.archivoTrimestral.name,
      descripcion: this.descripcionTrimestral,
      fecha,
      archivo: this.archivoTrimestral
    };

    this.informesTrimestrales.push(nuevoInforme);
    localStorage.setItem('informesTrimestrales', JSON.stringify(this.informesTrimestrales));

    // limpiar formulario
    this.descripcionTrimestral = '';
    this.archivoTrimestral = null;
    this.fechaTrimestral = undefined;
  }

  descargarInforme(informe: Informe) {
    const url = URL.createObjectURL(informe.archivo);
    const link = document.createElement('a');
    link.href = url;
    link.download = informe.nombre;
    link.click();
    URL.revokeObjectURL(url);
  }

  enviarCorreoInforme(informe: Informe) {
    alert(`Funcionalidad de envío por correo: ${informe.nombre}`);
  }

  eliminarInforme(inf: Informe) {
    if (this.tab === 'docente') {
      this.informesDocente = this.informesDocente.filter(x => x !== inf);
      localStorage.setItem('informesDocente', JSON.stringify(this.informesDocente));
    } else {
      this.informesTrimestrales = this.informesTrimestrales.filter(x => x !== inf);
      localStorage.setItem('informesTrimestrales', JSON.stringify(this.informesTrimestrales));
    }
  }

  cargarInformes() {
    const docente = localStorage.getItem('informesDocente');
    const trimestral = localStorage.getItem('informesTrimestrales');

    this.informesDocente = docente ? JSON.parse(docente).map((i: any) => ({ ...i, fecha: new Date(i.fecha) })) : [];
    this.informesTrimestrales = trimestral ? JSON.parse(trimestral).map((i: any) => ({ ...i, fecha: new Date(i.fecha) })) : [];
  }

  // Filtrado por fecha
  get informesFiltrados(): Informe[] {
    const lista = this.tab === 'docente' ? this.informesDocente : this.informesTrimestrales;
    return lista.filter(inf => {
      const infTime = inf.fecha.getTime();
      const inicio = this.filtroInicio ? new Date(this.filtroInicio).getTime() : null;
      const fin = this.filtroFin ? new Date(this.filtroFin).getTime() : null;
      return (!inicio || infTime >= inicio) && (!fin || infTime <= fin);
    });
  }

}
