import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http'
import swal from 'sweetalert2';
@Component({
  selector: 'foto-cliente',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit{

    @Input() cliente : Cliente;  //Este atributo viene como inyeccion desde Clientes.component.ts. Por eso el decorador Input()
    titulo = "Imagen Cliente";
    fotoSeleccionada : File;
    progreso : number = 0;        

    constructor(
      private clienteService: ClienteService, 
      private activatedRoute : ActivatedRoute,
      public modalService : ModalService){}
  
    ngOnInit(): void {
      //Para cuando cambia el parametro del id para obtener la foto:
      /*Este codigo se usaba para cuando se obtenia el cliente por el endpoint. 
       this.activatedRoute.paramMap.subscribe(params => {
        let id : number = +params.get('id');  //Obtenemos el id del parametro de la ruta.
        if (id) {
          this.clienteService.getClienteId(id).subscribe(cliente => { //Obtenemos el cliente a traves del back.
          this.cliente = cliente;            
          console.log("Obtuvimos un cliente:", this.cliente, "Su id es: ", this.cliente.id);          
          });
        }
      }); */
  }

  seleccionarFoto(event){ //Con este traemos la foto subida a la entrada de archivo del html
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log("Se ha seleccionado: ", this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error al Seleccionar Archivo:',`El archivo debe ser una imagen`, 'error');
      this.fotoSeleccionada = null;
    }
    
  }

  subirFoto(){  //Con este se lo mandamos al clienteService que se lo manda al back. 
    if (!this.fotoSeleccionada) {
      swal.fire('Error Upload:',`Debe seleccionar una foto`, 'error');
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe( event => { 
          //this.cliente = cliente;        
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded/event.total)*100);
          } else if ( event.type == HttpEventType.Response){
            let response : any = event.body;
            this.cliente = response.cliente as Cliente;
            this.modalService.notificarUpload.emit(this.cliente); //Cada vez que subamos una foto se debe notificar y emitir el cliente actualizado  
            swal.fire('Foto Subida Correctamente', response.mensaje, 'success');      
          }          
      });
    }    
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    //this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}

//Desde el back nos devuelve un cliente como response. Por eso nos suscribimos e igualamos ese cliente-response
      // que ya tiene la foto ajustada para el, y ese es el que usamos para actualizar el cliente desde aca.
