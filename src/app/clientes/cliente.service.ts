import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CLIENTES as CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaderResponse, HttpHeaders} from '@angular/common/http'; //(3-ConnBackGET)Componete de Angular que permite conectarse con el servidor remoto, a travez de peticiones HTTP(Get,Post,Put,Delete)   
import  swal  from 'sweetalert2';
import { Router } from '@angular/router';

/* Los decoradores indican que tipo de clase va a ser en Angular, cual es su rol y trabajo dentro de la aplicacion.
    @Injectable: Es para clase de servicios, representa la logica de negocio. Se puede inyectar a otros componentes
                  via inyeccion de dependencia a una clase component */

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes' //(4-ConnBackGET)Creamos la URL de donde se encuentra la peticion get de clientes.

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}) //Se crea porque el metodo post requiere una cabecera.

  constructor(private http: HttpClient, private router : Router) { } //(5-ConnBackGET)Creamos una variable HttpCliente para trabajar con ella. Se inyecta una dependencia.

  //Consumiendo los datos del archivo clientes.js.ts
   /* getClientes(): Cliente[] {
    return CLIENTES;    
  }  */
  /*Es un metodo sincrono no apto para api rest, pues se requiere manejar peticiones asincronas que no bloqueen la app mientras 
  la respuesta del servidor .espera
  */ 


  //Metodo Get:
  getClientes(page:number): Observable<any> {    //Porque desde el back ya no se recibe un Cliente[] sino un content (por la paginacion realizada)
    //Consumiendo los datos del archivo clientes.js.ts a traves de un observable
    //return of(CLIENTES);    
    
     /* 
    El método of() es un método estático de la clase Observable de la biblioteca rxjs, que toma uno o más valores y 
    devuelve un objeto Observable que emite esos valores inmediatamente. 
    En este caso, se pasa un array llamado CLIENTES como argumento a of(), lo que significa que el objeto Observable que 
    se devuelve emite el array CLIENTES inmediatamente.

    Por lo tanto, cuando un componente u otro código de la aplicación se suscribe a esta función, recibirá un objeto Observable 
    que emite un array de objetos de tipo Cliente. 
    Es posible que CLIENTES sea una variable definida en otra parte de la aplicación, o que se importe de un archivo de datos externo. 
    */

    //Consumiendo la api backend y sus datos.
    return this.http.get(this.urlEndPoint + '/page/'+ page).pipe(

      tap((response: any) => {     //El operador tap modifica, realiza procesos, guarda con los datos, pero no les cambia su valor
        //let clientes = response as Cliente[]; //Se cambia el response de tipo Objetc a tipo Cliente[] para poder usar el forEach
        console.log("Tap 1: ");
        (response.content as Cliente[]).forEach( cliente => {          
          console.log(cliente.nombre);
        })
      }),
      map((response:any) => {   //Al parecer el map sirve para la conversion de diferentes tipos de datos. Este map es para cambiar de flujo a listado clientes
        
         (response.content as Cliente []).map(  //Retornamos cada cliente del listado Clientes con los cambios realizados en este map:
          cliente => { //En este segundo map, manipulamos cada dato del listado clientes
            cliente.nombre = cliente.nombre.toUpperCase(); //Para convertirlos a Mayusculas            
            //cliente.createAt = formatDate(cliente.createAt, 'EEEE dd/MMMM/yyyy', 'es'); //Para modificar su formato fecha
            //'EEEE dd/MM/yyyy': Nombre completo semana
            //'EEE dd/MM/yyyy': Nombre abreviado semana
            //'dd/MMMM/yyyy': Nombre completo mes
            //'dd/MMM/yyyy': Nombre abreviado mes
            //'EEEE dd/MMMM/yyyy' = 'fullDate'
            return cliente;
          }
        )
        return response;
        }),
        tap(response => {          
          console.log("Tap 2: ");
          //No hace falta la linea de conversion del response del 1er tap, puesto que los datos ya pasaron por el map y ahora son tipo Cliente[]
          (response.content as Cliente[]).forEach( cliente => {          
            console.log(cliente.nombre);
          })
        })
    );  //(6-ConnBackGET)

     /* llamamos al atributo http creado en el constructor, (Por eso requiere el this.), luego indicamos el tipo de peticion, tambien
      se indica, cual es la url/enndpoint de esa peticion como argumentos. Hasta ahi no se ha convertido en lo que la funcion devuelve;
      un Observable<Cliente>. Para ello se hace un casting con <Cliente[]>. 
      
      Luego de eso ya se esta consumiendo el servicio en el cliente */
  }

  //Metod GetByID: Se acomoda endpoint getById del back. 
  getClienteId(id): Observable<Cliente>{    
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(    //Para consumirlo solo necesita un Id al final de la URL.
      catchError(e => {   //En caso de existir error.
        this.router.navigate(['/clientes']);  //Redirige a la tabla(Componente clientes).
        console.error(e.error.mensaje);       //En la consola imprime el atributo 'mensaje' del error traido del back.
        swal.fire(e.error.mensaje, e.error.error, 'error'); //Emerge una ventana los atributos 'mensaje' y 'error' traidos del back.
        return throwError(() => e);   //Devuelve el error envuelto en una funcion flecha para que coincida con el tipo Observable.
      })
    );    
  }

  //Metodo Post: Este metodo consume al endpoint del back, por sus parametros son; la URL, El cuerpo del objeto a crear y un header.
  createCliente(cliente: Cliente ): Observable<any>{    //Puesto que desde el back se recibe un map, casteamos a 'any'para mas flexibilidad.
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(

      catchError(e => {   //En caso de existir error.

        if (e.status == 400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje);       //En la consola imprime el atributo 'mensaje' del error traido del back.
        swal.fire('Error al crear', e.error.mensaje, 'error'); //Emerge una ventana con el atributo 'mensaje' del error.
        return throwError(() => e);   //Devuelve el error envuelto en una funcion flecha para que coincida con el tipo Observable..
      })
    );
  }

  //Metodo Update: Al igual que los anteriores metodos, este tambien se acomoda al endpoint del back y envia el cuerpo y el header para editar.
  updateCliente(cliente: Cliente): Observable<Cliente>{    
      return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente,  {headers: this.httpHeaders}).pipe(
        map( (response : any) => response.cliente as Cliente),  
        catchError(e => {   //En caso de existir error.

          if (e.status == 400) {
            return throwError(() => e);
          }

          console.error(e.error.mensaje);       //En la consola imprime el atributo 'mensaje' del error traido del back.
          swal.fire(e.error.mensaje, e.error.error, 'error'); //Emerge una ventana los atributos 'mensaje' y 'error' traidos del back.
          return throwError(() => e);   //Devuelve el error envuelto en una funcion flecha para que coincida con el tipo Observable.
        })
      );
  }

  //Metodo Delete:
  deleteCliente(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {   //En caso de existir error.
        console.error(e.error.mensaje);       //En la consola imprime el atributo 'mensaje' del error traido del back.
        swal.fire(e.error.mensaje, e.error.error, 'error'); //Emerge una ventana los atributos 'mensaje' y 'error' traidos del back.
        return throwError(() => e);   //Devuelve el error envuelto en una funcion flecha para que coincida con el tipo Observable.
      })
    );
}
}
