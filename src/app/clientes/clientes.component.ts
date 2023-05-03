import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'  
})
export class ClientesComponent {

  //Se crea un arreglo tipo Cliente con nombre clientes. Se debe importar Cliente.
  clientes: Cliente[] /* = [
    {id: 1, nombre: 'Juan', apellido: 'Ramirez', createAt: '2023-02-17', email:'dan2020reyes@gmail.com'},
    {id: 2, nombre: 'Jorge', apellido: 'Garcia', createAt: '2020-010-27', email:'jorgeg@gmail.com'},
    {id: 3, nombre: 'Solangie', apellido: 'Parra', createAt: '2012-08-7', email:'solangie@gmail.com'},
    {id: 4, nombre: 'Mariana', apellido: 'Hincapie', createAt: '2011-06-1', email:'maribel@gmail.com'},
    {id: 5, nombre: 'Juan', apellido: 'Ramirez', createAt: '26/04/2023', email: 'dan@gmail.com'},
    {id: 6, nombre: 'Maria', apellido: 'Gomez', createAt: '25/04/2023', email: 'maria@gmail.com'},
    {id: 7, nombre: 'Pedro', apellido: 'Lopez', createAt: '24/04/2023', email: 'pedro@gmail.com'},
    {id: 8, nombre: 'Luisa', apellido: 'Fernandez', createAt: '23/04/2023', email: 'luisa@gmail.com'},
    {id: 9, nombre: 'Diego', apellido: 'Castillo', createAt: '22/04/2023', email: 'diego@gmail.com'},
    {id: 10, nombre: 'Julia', apellido: 'Sanchez', createAt: '21/04/2023', email: 'julia@gmail.com'},
    {id: 11, nombre: 'Sofia', apellido: 'Garcia', createAt: '20/04/2023', email: 'sofia@gmail.com'}       
  ] */;
  /* Sin necesidad de llamar con la clase service, los datos pueden ser directamente llamados al agregarlos desde aca a la variable 
  que el html solicita, es decir "clientes". */

  //Inyeccion de dependencia
  constructor(private clienteService: ClienteService){} 

  ngOnInit(){
    //this.clientes =  this.clienteService.getClientes(); 
    /* Utilizamos la el metodo getClientes creado en la clase ClienteService 
    por medio del objeto clienteService para traer el listado de tipo Cliente[]. Esto cuando queremos traer los datos sincronamente 
    por lo que el metodo getClientes() devuelve un arreglo de Cliente[]*/

    /* Ahora trayendo los datos asincronamente, nos debemos suscribir al Observable*/
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes  //Funcion anonima muy abreviada (function (parametros) => {cuerpo funcion})
    );     
  } 
}
