import { Component, Input } from '@angular/core';

@Component({
  selector: 'page_header',
  template: `
            <div class="row page-title-height" id="page-title">
              <div class="col-sm-5">
                <h3>{{ title }} | <small>{{ sub_title }}</small></h3>
              </div>
              <div *ngIf="loadingVisible" class="panel panel-default col-sm-2" id="loading">
                <div class="panel-body text-center">
                  <i class="fa fa-spinner fa-spin"></i>  Loading ...
                </div>
              </div>
            </div>
    `
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() sub_title = '';
  @Input() loadingVisible = true;
}
