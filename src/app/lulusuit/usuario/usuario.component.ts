import { Component, OnInit } from '@angular/core';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioModalComponent } from './usuario-modal.component';
import { UsuarioService } from './usuario.service';
import { UsuarioAuthorityRenderComponent } from './usuario-authority-render.component';
import { UsuarioEnabledRenderComponent } from './usuario-enabled-render.component';
import { Usuario } from './usuario';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  toasterConfig: ToasterConfig;
  usuario: Usuario;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    mode: 'external',
    columns: {
      id: {
        title: 'ID',
        type: 'text',
        width: '80px',
        editable: false,
      },
      username: {
        title: 'Login',
        type: 'text',
      },
      authority: {
        title: 'Perfil',
        type: 'custom',
        width: '30%',
        renderComponent: UsuarioAuthorityRenderComponent,
        editor: {
          type: 'list',
          config: {
            list: [
              {value: 'ROLE_USER', title: 'Usuário Básico'},
              {value: 'ROLE_ADMIN', title: 'Usuário Administrador'},
            ],
          },
        },
      },
      enabled: {
        title: 'Habilitado?',
        type: 'custom',
        class: 'column-centered',
        renderComponent: UsuarioEnabledRenderComponent,
        editor: {
          type: 'checkbox',
        }
      },
    },
  };

  constructor(private service: UsuarioService,
              private modalService: NgbModal,
              private toasterService: ToasterService) { }

  ngOnInit() {
    const data = this.service.getData().subscribe(
      data => { this.source.load(data); },
      error => {
        console.log(error);
        this.showToast('error', 'Carregamentdo dos Dados', error);
      }
    );
  }

  onDelete(event): void {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      this.service.delete(event.data.id).subscribe(
        response => {
          if (response.success) {
            this.source.remove(event.data);
            this.showToast('success', 'Exclusão de Usuário', response.data.value);
          } else {
            this.showToast('error', 'Exclusão de Usuário', response.data.value);
          }
        },
        error => {
          this.showToast('error', 'Exclusão de Usuário', error);
        }
      );
    }
  }

  onCreate(event): void {
    /* abrir janela de cadastro do usuário aqui */
    const activeModal = this.modalService.open(UsuarioModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    activeModal.componentInstance.create = true;
    activeModal.componentInstance.usuario = this.usuario = new Usuario();
    activeModal.componentInstance.callback = this.saveCallBack.bind(this);
  }

  onEdit(event): void {
    /* abrir janela de cadastro do usuário aqui */
    const activeModal = this.modalService.open(UsuarioModalComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });

    this.usuario = event.data;
    /* Não se pode passar event.data para o formulário por causa da senha e
       da imagem. Em outros casos, pode-se passar this.entity logo após
       atualizar com event.data */
    let u = new Usuario();
    u.authority = event.data.authority;
    u.enabled = event.data.enabled;
    u.id = event.data.id;
    u.name = event.data.name;
    u.username = event.data.username;

    activeModal.componentInstance.create = false;
    activeModal.componentInstance.usuario = u;
    activeModal.componentInstance.callback = this.saveCallBack.bind(this);
  }

  saveCallBack(usuario: Usuario): void {
    this.service.createUpdate(usuario).subscribe(
      response => {
        if (!usuario.id) {
          usuario.id = response.id;
          this.source.prepend(usuario);
          this.showToast('success', 'Cadastro de Usuário', 'Usuário cadastrado com sucesso.');
        } else {
          this.source.update(this.usuario, usuario);
          this.showToast('success', 'Edição de Usuário', 'Usuário atualizado com sucesso.');
        }
      },
      error => {
        this.showToast('error', 'Edição de Usuário', error);
      }
    );
  }

  private showToast(type: string, title: string, body: string) {
    this.toasterConfig = new ToasterConfig({
      positionClass: 'toast-top-center',
      timeout: 5000,
      newestOnTop:true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'slideDown',
      limit: 5,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton:true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

}
