import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-administrativo',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-administrativo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavAdministrativoComponent { }
