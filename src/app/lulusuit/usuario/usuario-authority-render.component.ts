import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class UsuarioAuthorityRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    let output = "";
    if (this.value.toString() == "ROLE_USER") {
      output = "Usuário Básico";
    } else if ((this.value.toString() == "ROLE_ADMIN")) {
      output = "Usuário Administrador";
    }
    this.renderValue = output;
  }

}
