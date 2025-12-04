import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm,   } from '@angular/forms';
import { Proyecto, TipoParticipante } from '../../../interface/proyecto.interface';
import { ProyectoServices } from '../../../services/proyectos.services';
import { ProgramaAcademico } from '../../../interface/programa-academico.enum';


@Component({
  selector: 'app-registro-proyecto',
  imports: [CommonModule, FormsModule ],
  templateUrl: './registro-proyecto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroProyectoComponent {

  programasAcademicos: string[] = Object.values(ProgramaAcademico);
  TipoParticipante: string[] = Object.values(TipoParticipante);
  registroExitoso: boolean = false;

  generos: string[] = ['Masculino', 'Femenino', 'Otro'];

  constructor(
    public proyectoService: ProyectoServices,
    private cdr: ChangeDetectorRef
  ) {}

  get proyecto(): Proyecto {
    return this.proyectoService.getProyecto();
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.proyectoService.setLogo(file);
    }
  }

  agregarEstudiante(): void {
    this.proyectoService.agregarEstudiante();
  }

  eliminarEstudiante(index: number): void {
    this.proyectoService.eliminarEstudiante(index);
  }

  registrar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.proyectoService.registrarProyectoConEstado();
    this.registroExitoso = true;

    setTimeout(() => {
      this.registroExitoso = false;
      this.cdr.detectChanges();
    }, 3000);
  }


}






