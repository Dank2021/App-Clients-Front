import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './foto/modal.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'  
})
export class ClientesComponent {

  //Se crea un arreglo tipo Cliente con nombre clientes. Se debe importar Cliente.
  clientes: Cliente[]; /* = [
    {id: 1, nombre: 'Juan', apellido: 'Ramirez', createAt: '2023-02-17', email:'dan2020reyes@gmail.com'},
    {id: 2, nombre: 'Jorge', apellido: 'Garcia', createAt: '2020-010-27', email:'jorgeg@gmail.com'},
    {id: 3, nombre: 'Solangie', apellido: 'Parra', createAt: '2012-08-7', email:'solangie@gmail.com'}    
  ] */;
  /* Sin necesidad de llamar con la clase service, los datos pueden ser directamente llamados al agregarlos desde aca a la variable 
  que el html solicita, es decir "clientes". */

  clienteSeleccionado:Cliente;
  paginador : any;  

  //Inyeccion de dependencia
  constructor(
    private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
    ){ } 

  ngOnInit(){    
    //Consumiendo los datos del archivo clientes.js.ts a traves de un observable
    /* this.clientes =  this.clienteService.getClientes();  */    
    /* Utilizamos la el metodo getClientes creado en la clase ClienteService 
    por medio del objeto clienteService para traer el listado de tipo Cliente[]. Esto cuando queremos traer los datos sincronamente 
    por lo que el metodo getClientes() devuelve un arreglo de Cliente[]*/

    /* Ahora trayendo los datos asincronamente, nos debemos suscribir al Observable de getClientes()
        Desde esta clase llamamos al metodo que se comunica directamente con el back para asi llenar el arreglo de clientes que se
        mostrara en el clientes.componente.html*/
    
        //activatedRoute.paramMap: Se encarga de suscribir un observador cada que cambia el parametro page.
    this.activatedRoute.paramMap.subscribe(params => {  
        //Se obtiene el parametro page:
        let page:number = +params.get('page');       //Convertimos el params a tipo number (solo con '+') para utilizarlo como argumento en el get
        
        if (!page) {  //Si page no esta definido, que sea 0.
          page = 0;
        }        
        this.clienteService.getClientes(page) //Usamos el getClientes() pasando como parametro el page anteriormente obtenido y convertido
        .pipe(
          tap(response => { //Este tap solo imprime los nombres de los clientes traidos desde el get. No todos solo el numero definido. Los muestra por consola.
              console.log('ClientesComponent: tap: 3');
              (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.nombre);                  
              });
          })
        )
        .subscribe(
          response => {
            this.clientes = (response.content as Cliente[])  //Se recuerda que el back envia un content ya no un Cliente[]. Pero lo casteamos con el 'as'
            this.paginador = response;  //Tomamos todo el JSON content del back.
          }
        );
      }     
    )
    this.modalService.notificarUpload.subscribe(cliente => {  //Recibimos el cliente con la foto actualizada.
      this.clientes = this.clientes.map(clienteOriginal => {  //Recorremos la lista clientes, el indice seria "clienteOriginal"
        if (cliente.id == clienteOriginal.id) {  //Revisamos cual es el cliente a actualizarle la foto entre toda la lista
          clienteOriginal.foto = cliente.foto   //Actualizamos inmediatamente la foto actualizada
        }
        return clienteOriginal; //Retornamos el listado con la actualizacion.
      })
    })


  }
  
  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `Seguro quiere eliminar: ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente.id).subscribe(
          response => {

            this.clientes = this.clientes.filter(cli => cli != cliente);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con exito`,
              'success'
            )
          }
        )        
      }
    })
  }

  abrirModal(cliente:Cliente){

    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
