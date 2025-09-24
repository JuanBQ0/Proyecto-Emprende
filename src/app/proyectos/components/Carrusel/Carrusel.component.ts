import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule, FormsModule],
  templateUrl: './Carrusel.component.html',
  styleUrl: './Carrusel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarruselComponent {
  @Input() imagenes: string[] = [];
  @Input() imagenActual: number = 0;
}
