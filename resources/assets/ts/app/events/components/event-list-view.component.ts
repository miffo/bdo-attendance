import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material";

import {Event} from "../models/event";

@Component({
    selector: 'event-list',
    template: `
<div>
    <mat-table #table [dataSource]="eventDateSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.id}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef> name </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.name}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="event_date">
            <mat-header-cell *matHeaderCellDef> Event date </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.event_date}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="last_sign_up_date">
            <mat-header-cell *matHeaderCellDef> Last sign up date </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.last_sign_up_date}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="created_at">
            <mat-header-cell *matHeaderCellDef> Created at </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.created_at}} </mat-cell>
        </ng-container>
        
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row [routerLink]="['/event', event.id]" *matRowDef="let event; columns: displayedColumns;"></mat-row>
    
    </mat-table>
    <mat-paginator #paginator
                   [length]="eventDateSource.length()"
                   [pageIndex]="0"
                   [pageSize]="5"
                   [pageSizeOptions]="[5, 10, 25, 50]">
    </mat-paginator>
</div>
    `,
    styles: [`
    `]
})

export class EventListViewComponent implements OnInit
{
    count:number = 0;
    displayedColumns = ['id', 'name', 'event_date', 'last_sign_up_date', 'created_at'];
    eventDateSource: EventsDataSource;

    @Input() events$: Observable<Event[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit():void {
        if (!this.eventDateSource)
            this.eventDateSource = new EventsDataSource(new EventDatabase(this.events$), this.paginator);
    }
}

class EventsDataSource extends DataSource<Event> {
    constructor(private _database: EventDatabase, private _paginator: MatPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Event[]> {
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

    length() {
        const data = this._database.data.slice();
        return data.length;
    }
}

class EventDatabase {
    dataChange: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
    get data(): Event[] { return this.dataChange.value; }

    constructor(events$: Observable<Event[]>) {
        events$.subscribe(this.dataChange);
    }
}
