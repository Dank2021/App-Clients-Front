import { Injectable } from '@angular/core';
import { CLIENTES as CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

/* Los decoradores indican que tipo de clase va a ser en Angular, cual es su rol y trabajo dentro de la aplicacion.
    @Injectable: Es para clase de servicios, representa la logica de negocio. Se puede inyectar a otros componentes
                  via inyeccion de dependencia a una clase component */

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'

  constructor(private http: HttpClient) { }
  
  //Consumiendo la api backend y sus datos
/*    getClientes(): Observable<Cliente[]> {    
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }  */

  //Consumiendo los datos del archivo clientes.js.ts
  /* getClientes(): Cliente[] {
    return CLIENTES;    
  } 
  Es un metodo sincrono no apto para api rest, pues se requiere manejar peticiones asincronas que no bloqueen la app mientras 
  la respuesta del servidor .espera
  */ 

  getClientes(): Observable<Cliente[]> {    
    return of (CLIENTES);
   
  }
}

 /* 
    El método of() es un método estático de la clase Observable de la biblioteca rxjs, que toma uno o más valores y 
    devuelve un objeto Observable que emite esos valores inmediatamente. 
    En este caso, se pasa un array llamado CLIENTES como argumento a of(), lo que significa que el objeto Observable que 
    se devuelve emite el array CLIENTES inmediatamente.

    Por lo tanto, cuando un componente u otro código de la aplicación se suscribe a esta función, recibirá un objeto Observable 
    que emite un array de objetos de tipo Cliente. 
    Es posible que CLIENTES sea una variable definida en otra parte de la aplicación, o que se importe de un archivo de datos externo. 
    */
