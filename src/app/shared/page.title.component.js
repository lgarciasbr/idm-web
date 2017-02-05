"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PageHeaderComponent = (function () {
    function PageHeaderComponent() {
        this.title = '';
        this.visible = true;
    }
    __decorate([
        core_1.Input()
    ], PageHeaderComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], PageHeaderComponent.prototype, "visible", void 0);
    PageHeaderComponent = __decorate([
        core_1.Component({
            selector: 'page_header',
            template: "\n        <div class=\"page-header\" id=\"banner\">\n            <div class=\"row page-title\">\n                <div class=\"col-sm-5\">\n                    <h2><small>{{ title }}</small></h2>\n                </div>\n                <div *ngIf=\"visible\" class=\"alert alert-info loading col-sm-2 text-center\">\n    \t            <i class=\"fa fa-spinner fa-spin\"></i>  Loading ...\n    \t        </div>\n            </div>\n        </div>\n    "
        })
    ], PageHeaderComponent);
    return PageHeaderComponent;
}());
exports.PageHeaderComponent = PageHeaderComponent;
