import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
    
  @Input() //Le indicamos que el campo paginador es un atributo inyectado/ 
  paginador : any;  //Este es el atributo que guarda lo inyectado desde el padre clientes.component. En resumen, se recibe desde cliente.component y por el html se trae hasta aca
  paginas : number[];
  rango_ini: number;
  rango_fin: number;

  ngOnInit(): void {
    this.initiPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void { //Usamos el OnChanges porque el parametro de la pagina puede cambiar durante el ciclo de vida. En el OnInit no podemos obtener estas actualizaciones
    let paginadorActualizado = changes['paginador'];

    if (paginadorActualizado.previousValue) {
      this.initiPaginator();
    }
  }

  private initiPaginator(): void{
    this.rango_ini = Math.max(1, this.paginador.number-2)//Minimo el inicio empezara en 1 y de ahi en adelante, dos paginas antes.
     
    this.rango_fin = Math.min( this.paginador.totalPages, this.paginador.number+4);//Maximo llegara hasta la totalidad de las pagina, Si nomostrara las 3 paginas siguientes.

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.rango_fin - this.rango_ini + 1).fill(0).map((valor, indice) => indice + this.rango_ini);
    }else{
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }    
  }

}


