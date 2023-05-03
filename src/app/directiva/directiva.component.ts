import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',  
})
export class DirectivaComponent {

  listacurso: String[] = ['Typescrip', 'Javascrip', 'Java SE', 'C#', 'PHP'];
  habilitar: boolean = true;


  setHabilitar(): void {
    this.habilitar = !this.habilitar;
  } 
}
/* Este componente se creo por consola con el alias "ng g c directiva" comando que permite crear componentes de forma automatica
 tanto en sus archivos .html,css,.ts y .spec.ts ademas de importar y registrar el componente en app.module.ts automaticamente. */