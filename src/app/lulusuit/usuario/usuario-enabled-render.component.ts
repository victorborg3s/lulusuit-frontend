import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    <div class="column-centered">
      <nb-checkbox [value]="renderValue" disabled ></nb-checkbox>
    </div>
  `,
  styleUrls: ['./usuario-enabled-render.component.scss']
})
export class UsuarioEnabledRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

}
