import { Component, OnInit } from '@angular/core';
import { NavbarDocenteComponent } from "../../components/navbar-docente/navbar-docente.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Proyecto {
  nombre: string;
  estado: 'Activo' | 'Inactivo' | 'Graduado';
  fecha: Date;
}

interface Informe {
  nombre: string;
  descripcion: string;
  fecha: Date;
}

@Component({
  selector: 'app-docente-dashboard',
  imports: [NavbarDocenteComponent, CommonModule, FormsModule],
  templateUrl: './docente-dashboard.component.html',
  styleUrl: './docente-dashboard.component.css'
})
export class DocenteDashboardComponent implements OnInit{
proyectos: Proyecto[] = [];
  informes: Informe[] = [];

  // Para buscador
  filtroTexto = '';
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  constructor() { }

  ngOnInit(): void {
    this.cargarDatosDemo();
  }

  cargarDatosDemo() {
    // Datos de ejemplo, reemplazar por localStorage o API
    this.proyectos = [
      { nombre: 'Proyecto A', estado: 'Activo', fecha: new Date('2025-01-10') },
      { nombre: 'Proyecto B', estado: 'Graduado', fecha: new Date('2024-12-15') },
      { nombre: 'Proyecto C', estado: 'Inactivo', fecha: new Date('2025-03-05') },
    ];

    this.informes = [
      { nombre: 'Informe Enero', descripcion: 'Primer informe', fecha: new Date('2025-01-20') },
      { nombre: 'Informe Febrero', descripcion: 'Segundo informe', fecha: new Date('2025-02-15') },
      { nombre: 'Informe Marzo', descripcion: 'Tercer informe', fecha: new Date('2025-03-10') },
    ];
  }

  // Métricas
  get activos() {
    return this.proyectos.filter(p => p.estado === 'Activo').length;
  }
  get inactivos() {
    return this.proyectos.filter(p => p.estado === 'Inactivo').length;
  }
  get graduados() {
    return this.proyectos.filter(p => p.estado === 'Graduado').length;
  }

  // Filtro rápido de informes
  get informesFiltrados() {
    return this.informes.filter(inf => {
      const fechaInf = new Date(inf.fecha).getTime();
      let pasaTexto = this.filtroTexto ? inf.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()) || inf.descripcion.toLowerCase().includes(this.filtroTexto.toLowerCase()) : true;
      let pasaFechaInicio = this.filtroFechaInicio ? fechaInf >= new Date(this.filtroFechaInicio).getTime() : true;
      let pasaFechaFin = this.filtroFechaFin ? fechaInf <= new Date(this.filtroFechaFin).getTime() : true;
      return pasaTexto && pasaFechaInicio && pasaFechaFin;
    });
  }

}
