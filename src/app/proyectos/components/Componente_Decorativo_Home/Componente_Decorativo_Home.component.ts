import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CarruselComponent } from "../Carrusel/Carrusel.component";
import { ComponenteHomePageComponent } from "../Componente_Nosotros/Componente_Home_Page.component";

@Component({
  selector: 'app-componente-decorativo-home',
  imports: [CarruselComponent],
  templateUrl: './Componente_Decorativo_Home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponenteDecorativoHomeComponent implements OnInit, OnDestroy{
  constructor(private cdr: ChangeDetectorRef) {}
  imagenes: string[] = [
    'image/segundo.jpeg',
    'image/primero.jpg',
    'image/tercero.jpg',
    'image/festival.jpg',
  ];
  imagenActual = 0;
  intervaloId: any;

  ngOnInit(): void {
    this.intervaloId = setInterval(() => {
      this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
      this.cdr.detectChanges(); // <- Forzar actualización de vista
    }, 6000);
  }

  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }
  tarjetas = [
    {
      titulo: 'Galería de Proyectos',
      descripcion:
        'Sumérgete en nuestra galería de proyectos donde los emprendedores dan vida a sus ideas. Conoce las iniciativas que han surgido de la creatividad, el esfuerzo y el compromiso con el cambio.',
      imagen: 'image/Decorador/foto2.jpg',
      link: '/galeria',
      boton: 'Ver más',
    },
    {
      titulo: 'Conócenos',
      descripcion:
        'Descubre quiénes somos, qué nos inspira y por qué trabajamos cada día por fortalecer el ecosistema emprendedor. Aquí podrás conocer la historia, el propósito y el equipo detrás de esta unidad.',
      imagen: 'image/arreglo/fondo3.png',
      link: '/conocenos',
      boton: 'Saber más',
    },
    {
      titulo: 'Contáctanos',
      descripcion:
        '¿Tienes una idea, propuesta o simplemente quieres hablar con nosotros? Nuestro equipo está listo para escucharte, acompañarte y guiarte en tu camino emprendedor. ¡Escríbenos!',
      imagen: 'image/Decorador/foto3.png',
      link: '/contacto',
      boton: 'Contactar',
    },
    {
      titulo: 'Unidad de Emprendimiento',
      descripcion:
        'Nuestra unidad está diseñada para acompañar, formar y fortalecer a los emprendedores desde sus primeros pasos. Conoce todos los programas, mentorías y herramientas que tenemos para ti.',
      imagen: 'image/tercero.jpg',
      link: '/unidad-emprendimiento',
      boton: 'Conocer más',
    },
    {
      titulo: 'Nuestros Eventos',
      descripcion:
        'Participa en talleres, ferias, charlas y más. Descubre los eventos que organizamos para conectar talentos, impulsar ideas y fomentar el espíritu emprendedor en nuestra comunidad.',
      imagen: 'image/eventos/primerE.jpg',
      link: '/unidad-emprendimiento',
      boton: 'Conocer más',
    },
  ];
}
