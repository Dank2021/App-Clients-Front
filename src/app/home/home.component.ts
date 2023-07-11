import { Component } from '@angular/core';

//(2-Hom)Decorador: Es la diferencia entre cualquier tipo de clase de Angular. Se diferencia por este. 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//(1-Hom)Se exporta para que se pueda registrar en la configuracion del modulo (app.modulo.ts)
export class HomeComponent {
  home : string = "Este va a ser el home.";
}

/* (2.1-Hom) Lo anterior es lo minimo para un componente, ahora se debe realizar el proceso para que este se acople a la aplicacion.
Puesto que hasta ahora, unicamente se tiene un comoponente/clase creado sin mas, dentro del proyecto. Pero aun no se ha configurado
en ningun lugar para que se despliegue. El siguiente paso es registrarlo en el module.ts*/
