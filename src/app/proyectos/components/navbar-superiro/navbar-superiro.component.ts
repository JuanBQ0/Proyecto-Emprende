import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-superior',
  imports: [RouterLink],
  templateUrl: './navbar-superiro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarSuperiroComponent {

  imagenes: string = 'image/logo.png';

 }
