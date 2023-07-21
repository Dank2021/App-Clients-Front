import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'foto-cliente',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit{

    cliente : Cliente;
    titulo = "Imagen Cliente";
    private fotoSeleccionada : File;

    constructor(private clienteService: ClienteService, private activatedRoute : ActivatedRoute){}
  
    ngOnInit(): void {
      //Para cuando cambia el parametro del id para obtener la foto:
      this.activatedRoute.paramMap.subscribe(params => {
        let id : number = +params.get('id');  //Obtenemos el id de parametro de la ruta.
        if (id) {
          this.clienteService.getClienteId(id).subscribe(cliente => { //Obtenemos el cliente.
          this.cliente = cliente;            
          console.log("Obtuvimos un cliente:", this.cliente, "Su id es: ", this.cliente.id);          
          });
        }
      });
  }

  seleccionarFoto(event){ //Con este traemos la foto subida a la entrada de archivo del html
    this.fotoSeleccionada = event.target.files[0];
    console.log("Se ha seleccionado: ", this.fotoSeleccionada);
    
  }

  subirFoto(){  //Con este se lo mandamos al clienteService que se lo manda al back. 
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
    .subscribe( cliente => { 
        this.cliente = cliente;        
        swal.fire('Foto Subida Correctamente',`La foto se subio con exito. Nombre foto: ${this.cliente.foto}`, 'success');      
    });
  }
}

//Desde el back nos devuelve un cliente como response. Por eso nos suscribimos e igualamos ese cliente-response
      // que ya tiene la foto ajustada para el, y ese es el que usamos para actualizar el cliente desde aca.
