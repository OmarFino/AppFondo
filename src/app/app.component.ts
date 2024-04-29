import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fondo, FondoCliente } from './Interfaces/fondo';
import { FondoService } from './Services/fondo.service';
import { Cliente } from './Interfaces/cliente';
import { ClienteService } from './Services/cliente.service';
import { window } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  listaFondos: Fondo[] = [];
  listacliente: any[] | [] | undefined = [];
  listaClienteFondo: FondoCliente[] = [];
  idCliente: any = "";
  data: any = {};

  formularioFondo: FormGroup;

  constructor(
    private _fondoServicio: FondoService,
    private _clienteServicio: ClienteService,
    private fb: FormBuilder
  ) {

    this.formularioFondo = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  obtenerFondos() {

    this._fondoServicio.getList().subscribe({
      next: (data) => {
        this.listaFondos = data;
      }, error: (e) => {


      }
    });

  }

  obtenerClientes() {

    this._clienteServicio.getList().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.listacliente = data;
        } else {
          this.listacliente = [data.data];
          this.listaClienteFondo = data.data.fondos
          this.idCliente = data.data.identification


        }
      }, error: (e) => {
        console.log("aqui");

      }
    });

  }

  ngOnInit(): void {
    this.obtenerFondos(),
      this.obtenerClientes();
  }


  agregarFondo(valor: string, id: string) {
    var data = {
    }
    this.data.id= this.idCliente,
    this.data.idFondo= id,
    this.data.valor= valor

    console.log(this.data);
    

    this._clienteServicio.putFondoCliente(this.idCliente, id, valor).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);

        console.log("aasas- ",response.data);
        alert(response.data)
      },
      error: (error: any) => {
        console.error('Error en la solicitud:', error);
      },
      complete: () => {
        console.log('Solicitud completada');
        this.obtenerClientes();
      }
    });
  }


  // agregarTarea(){
  //   const request :Tarea = {
  //     idTarea:0,
  //     nombre: this.formularioTarea.value.nombre
  //   }

  //   this._tareaServicio.add(request).subscribe({
  //     next:(data) => {
  //       this.listaTareas.push(data);
  //       this.formularioTarea.patchValue({
  //         nombre: ""
  //       });
  //     },error:(e) => {}
  //   });

  // }

  // eliminarTarea(tarea:Tarea){

  // this._tareaServicio.delete(tarea.idTarea).subscribe({
  //       next:(data) => {
  //         const nuevaLista = this.listaTareas.filter(item => item.idTarea != tarea.idTarea)
  //         this.listaTareas = nuevaLista;
  //       },error:(e) => {}
  //     });
  // }



}
