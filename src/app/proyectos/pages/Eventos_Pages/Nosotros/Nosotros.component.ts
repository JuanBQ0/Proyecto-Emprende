import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponenteHomePageComponent } from "../../../components/Componente_Nosotros/Componente_Home_Page.component";

@Component({
  selector: 'app-nosotros',
  imports: [ComponenteHomePageComponent],
  templateUrl: './Nosotros.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NosotrosComponent {

}
