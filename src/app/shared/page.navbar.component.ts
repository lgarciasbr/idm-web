import { Component } from '@angular/core';

import { environment } from '../../environments/environment';

@Component({
  selector: 'page-navbar',
  template: `
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container">
                    
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" (click)="isCollapsed = !isCollapsed" >
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" routerLink="">{{ projectWebName }}</a>
                    </div>
            
                    <div id="navbar" class="navbar-collapse collapse" [collapse]="isCollapsed">
                        
                        <ul class="nav navbar-nav">
                            <li><a routerLink="/accounts" routerLinkActive="active" (click)="isCollapsed = !isCollapsed">Accounts</a></li>
                            <li><a routerLink="/groups" routerLinkActive="active" (click)="isCollapsed = !isCollapsed">Groups</a></li>
                            <li><a routerLink="/company" routerLinkActive="active" (click)="isCollapsed = !isCollapsed">Company</a></li>
                        </ul>
            
                        <ul class="nav navbar-nav navbar-right">
                            <li><a [routerLink]="['/auth', 'logout']" routerLinkActive="active">Logout</a></li>
                        </ul>
                        
                    </div>
                </div>
            </nav>
    `
})
export class PageNavbarComponent {
  public projectWebName = environment.projectWebName;
  public isCollapsed: boolean = true;
}
