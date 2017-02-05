import { Component } from '@angular/core';

@Component({
    selector: 'notfound',
    template: `
            <div class="navbar"></div>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-4 text">
                        <h3><strong>404</strong> Something's wrong here ...</h3>
                        <div class="description">
                            <p>
                                Sorry, requested page not found! <a routerLink="" routerLinkActive="active">Take me <strong>HOME</strong></a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
})

export class NotFoundComponent {

}
