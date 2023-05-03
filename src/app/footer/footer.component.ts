//Cualquier clase componente de angular debe llevar la anotacion @Component

import { style } from "@angular/animations";
import { Component } from "@angular/core";

@Component({    //(2-F)
    selector: "app-footer",
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']       //stylesURLs indica que puede recibir varias hojas de estilo.
})
export class FooterComponent {  //(1-F)

    public autor: any = {nombre : "Juan", apellido : "Ramirez"};
                         //any sirve para crear objetos de tipo generico que no pertenezcan a un tipo/clase particular
}
