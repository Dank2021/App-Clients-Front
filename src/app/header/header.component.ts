import { Component } from "@angular/core";

//(2-H)Decorador: Es la diferencia entre cualquier tipo de clase de Angular. Se diferencia por este. 
@Component({    
    selector: 'app-header',     //Para identificar un componente en la plantilla HTML de la aplicación y luego asociarle un estilo CSS.
    templateUrl: './header.component.html'      //Donde encontrar el html del componente. 
    //Si es muy corto, se puede colocar alli el codigo html usando unicamente template: ``.
})    

//(1-H)Se exporta para que se pueda registrar en la configuracion del modulo (app.modulo.ts)
export class HeaderComponent {    //De cierta manera estamos diciendo; "Si quiere exportarlo, lo encuentra como "HeaderComponent"
    title : string = 'App Angular Spring' //Declaramos una variable que usaremos en el html de este componente.
}

/* (2.1-H) Lo anterior es lo minimo para un componente, ahora se debe realizar el proceso para que este se acople a la aplicacion.
Puesto que hasta ahora, unicamente se tiene un comoponente/clase creado sin mas dentro del proyecto. Pero aun no se ha configurado
en ningun lugar para que se despliegue. El siguiente paso es registrarlo en el module.ts*/
