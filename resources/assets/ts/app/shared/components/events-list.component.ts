import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";

import {Event} from "../../events/models/event";

@Component({
    selector: 'events-list',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.id}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="event_name">
            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.name}} </mat-cell>
        </ng-container>
        

        <ng-container matColumnDef="event_date">
            <mat-header-cell *matHeaderCellDef> Event date </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.event_date}} </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
        <mat-row [routerLink]="['/events', event.id]" *matRowDef="let event; columns: displayColumns;"></mat-row>

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
export class EventsListComponent implements OnInit, OnDestroy
{
    dataSource:EventsDataSource | null;
    @Input() displayColumns:string[];
    @Input() database:EventsDatabase<any>;
    @ViewChild(MatPaginator) paginator:MatPaginator;

    ngOnInit() {
        this.dataSource = new EventsDataSource(this.database, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}

class EventsDataSource extends DataSource<Event> {
    constructor(private _database:EventsDatabase<any>, private _paginator:MatPaginator) {
        super();
    }

    connect(): Observable<Event[]> {
        const displayDataChanges = [
            this._database.dataChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._database.data.slice();

            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
        });
    }

    disconnect() {}
}

export interface EventsDatabase<T> {
    dataChange:BehaviorSubject<T>
    data:Event[];
}