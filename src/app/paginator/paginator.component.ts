import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
  
  @Input() //Le indicamos que el campo paginador es un atributo inyectado/ 
  paginador : any;  //Este es el atributo que guarda lo inyectado desde el padre clientes.component. En resumen, se recibe desde cliente.component y por el html se trae hasta aca
  paginas : number[];

  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    /*Se crea el arreglo sobre el que se iterara en el html de este componenete, para eso se utiliza el atributo paginador del 
    cual se saca el campo totalPage, luego llenamos el arreglo de ceros y iniciamos la 1era pagina en el numero 1 y no en 0 que es 
    como viene desde el back*/
  }


}
