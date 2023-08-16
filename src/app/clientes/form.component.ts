import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './Region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit{
  public cliente: Cliente = new Cliente;
  public regiones: Region[];
  public titulo: String = "Crear/Editar Cliente";
  public errores : String[];

  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.cargarCliente(); //Cada vez que se recurra al formulario, se ejecutara el metodo que enlaza automaticamente los campos.

  }

  //GetByID: Este metodo rellena los campos del formulario usando el Id dado en la URL cuando se quiere editar un usuario en especifico.
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
    this.clienteService.getRegiones().subscribe( regiones => this.regiones = regiones)  //Nos suscribimos y recibimos los datos desde el back de las regiones y se lo asignamos a la variable de este .ts
  }

  //Post: Cuando en el formulario se vaya a crear un cliente, redirige a la tabla y emerge una ventana indicando el exito de la peticion Post.
  create(): void{    
    console.log("Cliente creado: ", this.cliente);    
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
    console.log("Cliente editado: ", this.cliente);    
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

  public compararRegion(o1 : Region, o2 : Region): boolean{             
     ////o1 === null || o2 === null || o1 === undefined || o1 === undefined ? false : o1.id === o2.id;
     if (o1 === undefined && o2 === undefined) {
      return true;
     }
    return o1 && o2 ? o1.id === o2.id : false;  //Se verifica la existencia de los objetos, si existen, se comparan por id. Sino, retorna false.
  }
}
