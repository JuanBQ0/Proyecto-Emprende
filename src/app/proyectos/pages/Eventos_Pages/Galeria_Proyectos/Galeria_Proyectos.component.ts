import { CommonModule, formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-galeria-proyectos',
  imports: [CommonModule, FormsModule],
  templateUrl: './Galeria_Proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaleriaProyectosComponent {

  proyectos = [
  {
    titulo: 'Cerveza artesanal',
    descripcion: 'Llaveros de algodon con diseño de animales',
    imagen: 'image/emprendimientos/cerveza.png',
    id: '1',
    nombreProyecto: 'Llaveros de animales',
    categoria: 'Cocina',
    estudiantes: [
      {
        programa: 'Ingeniería de Sistemas',
        nombres: 'Ana',
        apellidos: 'Ríos',
        identificacion: '1234567890',
        tel: '3001112233',
        correo: 'ana.rios@upc.edu.co'
      }
    ],
    redesSociales: 'https://instagram.com/proyecto-gestion'
  },
  {
    titulo: 'Accesorios',
    descripcion: 'Manillas hechas a manos',
    imagen: 'image/emprendimientos/perlas.png',
    id: '2',
    nombreProyecto: 'Manillas MVP',
    categoria: 'Artesania',
    estudiantes: [
      {
        programa: 'Ingeniería Electrónica',
        nombres: 'Maria',
        apellidos: 'Gómez',
        identificacion: '9876543210',
        tel: '3004445566',
        correo: 'maria.gomez@upc.edu.co'
      }
    ],
    redesSociales: 'https://facebook.com/proyecto-bienestar'
  },
  {
    titulo: 'Postres',
    descripcion: 'Psotres de galletas, 3 leches y demas',
    imagen: 'image/emprendimientos/pudin.png',
    id: '3',
    nombreProyecto: 'Endulsate',
    categoria: 'Cocina',
    estudiantes: [
      {
        programa: 'Ingeniería Mecatrónica',
        nombres: 'Carla',
        apellidos: 'Martínez',
        identificacion: '1122334455',
        tel: '3007778899',
        correo: 'carla.martinez@upc.edu.co'
      }
    ],
    redesSociales: 'https://linkedin.com/in/proyecto-transporte'
  },
  {
    titulo: 'Rocket League',
    descripcion: 'Carritos a control remoto, carritos futbolistas',
    imagen: 'image/emprendimientos/car.png',
    id: '3',
    nombreProyecto: 'CarFutbol',
    categoria: 'Electronica',
    estudiantes: [
      {
        programa: 'Ingeniería Electronica',
        nombres: 'Mario',
        apellidos: 'Martínez',
        identificacion: '324242324',
        tel: '3007778899',
        correo: 'Mario.martinez@upc.edu.co'
      }
    ],
    redesSociales: 'https://linkedin.com/in/proyecto-transporte'
  }
];


  proyectoSeleccionado: any = null;

  abrirModal(proyecto: any) {
    this.proyectoSeleccionado = proyecto;
  }

  cerrarModal() {
    this.proyectoSeleccionado = null;
  }
}
