import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-title',
  template: `
            <div class="row page-title-height" id="page-title">
              <div class="col-sm-5">
                <h3>{{ title }} | <small>{{ subTitle }}</small></h3>
              </div>
              <div *ngIf="isLoadingVisible" class="panel panel-default col-sm-2" id="loading">
                <div class="panel-body text-center">
                  <i class="fa fa-spinner fa-spin"></i> loading
                </div>
              </div>
            </div>
    `
})
export class PageTitleComponent {
  @Input() title = '';
  @Input() subTitle = '';
  @Input() isLoadingVisible = false;
}
