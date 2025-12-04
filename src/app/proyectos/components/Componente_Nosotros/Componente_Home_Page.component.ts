import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';



@Component({
  selector: 'app-componente-home-page',
  imports: [CommonModule],
  templateUrl: './Componente_Home_Page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './Componente_Home_Page.component.css',
})

export class ComponenteHomePageComponent {

  personas = [
    {
      foto: 'image/empleados/Yolanda_Rodero.jpg',
      title: 'YOLANDA RODERO',
      subtitle: 'DIRECTORA',
      description: 'Directora de la unidad de emprendimiento de la Univercidad Popular del Cesar',
      features: ['Liderazgo', 'Gestión Estratégica', 'Toma de decisiones', 'Innovación']
    },
    {
      foto: '',
      title: '',
      subtitle: 'SECRETARIA',
      description: 'Secretaria de la unidad de emprendimiento de la Univercidad Popular del Cesar',
      features: ['Organización', 'Comunicación efectiva', 'Gestión Documental', 'Atención al usuario']
    },
    {
      foto: 'image/empleados/Ivelcy_Perez.jpg',
      title: 'IVELCY PEREZ',
      subtitle: 'ASISTENTE',
      description: 'Asistente de la unidad de emprendimiento de la Univercidad Popular del Cesar',
      features: ['Trabajo en equipo', 'Soporte administrativo', 'Manejo de agendas', 'Responsabilidad']
    }

  ];
  ringIndexes = Array.from({ length: 10 }, (_, i) => i);
  flippedCards: boolean[] = [];
  ngOnInit() {
    this.flippedCards = Array(this.personas.length).fill(false);
  }

}
