import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Usuario } from './usuario'

@Component({
  selector: 'ngx-usuario-modal',
  templateUrl: './usuario-modal.component.html',
})
export class UsuarioModalComponent implements OnInit {

  usuario: Usuario;
  create: boolean;
  callback: Function;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  closeModal(): void {
    this.activeModal.close();
  }

  SaveAndCloseModal(): void {
    this.callback(this.usuario);
    this.closeModal();
  }

  fileChange(event) {
    this.readFile(event.target);
  }

  readFile(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.usuario.imageBase64 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}
