import { Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'paginator',
    template: `
            <div class="text-center">
                <ul  class="pagination">
                    <li [ngClass]="{disabled:page === 1}">
                        <a (click)="getUsers(1)">First</a>
                    </li>
                    <li [ngClass]="{disabled:page === 1}">
                        <a (click)="getUsers(page - 1)">Previous</a>
                    </li>
                    <li *ngFor="let pageNumber of pagesArray" [ngClass]="{active:page === pageNumber}">
                        <a (click)="getUsers(pageNumber)">{{pageNumber}}</a>
                    </li>
                    <li [ngClass]="{disabled:page === pages}">
                        <a (click)="getUsers(page + 1)">Next</a>
                    </li>
                    <li [ngClass]="{disabled:page === pages}">
                        <a (click)="getUsers(pages)">Last</a>
                    </li>
                </ul>
            </div>
    `
})
export class PaginatorComponent{
    @Input() page;
    @Input() pages;
    public pagesArray;

    getUsers(page?){}

    createPages(){
        if (this.pages > 5){
            this.pagesArray = new Array(5);
            var maxPage;
            var minPage;

            if (this.page >= 4 && this.page + 2 <= this.pages)
                minPage = this.page - 2;
            else if (this.page + 2 >= this.pages)
                minPage = this.pages - 4;
            else
                minPage = 1;

            if (this.page < 4)
                maxPage = 5
            else if (this.page + 2 < this.pages)
                maxPage = this.page + 2;
            else
                maxPage = this.pages;

            for (var i = 0; i <= 5; i++) {
                if (minPage <= maxPage)
                    this.pagesArray[i] = minPage;

                minPage++;
            }
        }
        else {
            this.pagesArray = new Array(this.pages)

            for (var i = 1; i <= this.pages; i++) {
                this.pagesArray[i-1] = i;
            }
        }

    }

}
