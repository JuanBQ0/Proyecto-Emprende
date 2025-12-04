import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-superior',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-superiro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarSuperiroComponent {

  imagenes: string = 'image/logo.png';

  isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

 }
