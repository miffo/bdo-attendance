import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";

import {Afk} from "../../afk/models/afk";

import {UserAfkDatabase} from "./user-detail.component";

@Component({
    selector: 'user-detail-afk',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let afk"> {{afk.id}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="reason">
            <mat-header-cell *matHeaderCellDef> Reason </mat-header-cell>
            <mat-cell *matCellDef="let afk"> {{afk.reason}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="from_date">
            <mat-header-cell *matHeaderCellDef> From date </mat-header-cell>
            <mat-cell *matCellDef="let afk"> {{afk.from_date}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="to_date">
            <mat-header-cell *matHeaderCellDef> To date </mat-header-cell>
            <mat-cell *matCellDef="let afk"> {{afk.to_date}} </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
        <mat-row [routerLink]="['/afk', afk.id]" *matRowDef="let afk; columns: displayColumns;"></mat-row>

    </mat-table>
    <mat-paginator #paginator
                   [length]="database.data.length"
                   [pageIndex]="0"
                   [pageSize]="5"
                   [pageSizeOptions]="[5, 10, 25, 50]">
    </mat-paginator>
</div>`,
    styles: [`
    `]
})
export class UserDetailAfkComponent implements OnInit, OnDestroy
{
    displayColumns = ['reason', 'from_date', 'to_date'];
    dataSource:EventDataSource | null;
    @Input() database:UserAfkDatabase;
    @Input() @ViewChild(MatPaginator) paginator:MatPaginator;

    ngOnInit() {
        this.dataSource = new EventDataSource(this.database, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}

class EventDataSource extends DataSource<Afk> {
    constructor(private _database:UserAfkDatabase, private _paginator:MatPaginator) {
        super();
    }

    connect(): Observable<Afk[]> {
        const displayDataChanges = [
            this._database.dataChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._database.data.slice();

            // Grab the page's slice of data.
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    disconnect() {}
}