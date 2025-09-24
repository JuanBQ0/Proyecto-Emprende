import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-contacto',
  imports: [],
  templateUrl: './Contacto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent {

CorreoUniversidad = signal<string>('unidaddeemprendimiento@unicesar.edu.co');
CorreoUnidadEmprende = signal<string>('emprendimientoupecista2023@gmail.com');
}
