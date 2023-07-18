import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit{
  public cliente: Cliente = new Cliente;
  public titulo: String = "Crear/Editar Cliente";
  public errores : String[];

  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.cargarCliente(); //Cada vez que se recurra al formulario, se ejecutara el metodo que enlaza automaticamente los campos.
  }

  
  //GetByID: Este metodo rellena los campos del formulario usando el Id dado cuando se quiere editar un usuario en especifico
  cargarCliente(): void{    
    this.activatedRoute.params.subscribe(      
      params => {
        let id = params['id'];
        if(id){ //Si el id existe:
          this.clienteService.getClienteId(id).subscribe( //Asignamos los valores al objeto cliente de esta clase
            cliente => this.cliente = cliente
          )
        }
      }
    )
  }

  //Post: Cuando en el formulario se vaya a crear un cliente, redirige a la tabla y emerge una ventana indicando el exito de la peticion Post.
  create(): void{    
    this.clienteService.createCliente(this.cliente).subscribe(        
      response => { //El atributo 'response' se comporta como un JSON, por lo que permite no solo usar el campo 'cliente' sino que tambien permite utilizar el campo 'mensaje' que viene desde el back al retornar un map con estos.
        swal.fire('Nuevo Cliente', `Ciente: ${response.cliente.nombre} ${response.cliente.apellido} ${response.mensaje}`, 'success'); //Se emerge una ventana indicado el exito de la funcion, utilizando los atributos de respuesta que envia el back. 
        this.router.navigate(['/clientes'])        
      },
      err => {
        this.errores = err.error.errors as String[]
        console.log('Codigo de error desde el back:'+ err.status);
        console.log(err.error.errors);        
      }
    )    
  }

  //Put: Cuando en el formulario se vaya a editar un cliente, redirige a la tabla y emerge una ventana indicando el exito de la peticion Put.
  public update(): void{    
    this.clienteService.updateCliente(this.cliente).subscribe(        
      response => { //El atributo 'response' se comporta como un Cliente, por lo que permite no se puede usar el campo 'mensaje' que viene desde el back.
        swal.fire('Editado', `Cliente ${response.nombre} ${response.apellido} editado con exito`, 'success');
        this.router.navigate(['/clientes'])        
      },
      err => {
        this.errores = err.error.errors as String[]
        console.log('Codigo de error desde el back:'+ err.status);
        console.log(err.error.errors);        
      }
    )    
  }  
}
