import {Component, Input, OnInit, ViewChild, OnDestroy} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material";

import {Event} from "../models/event";

@Component({
    selector: 'event-list-view',
    template: `
<div>
    <mat-table #table [dataSource]="eventDateSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.id}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.name}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="event_date">
            <mat-header-cell *matHeaderCellDef> Event date </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.created_at}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="last_sign_up_date">
            <mat-header-cell *matHeaderCellDef> Last sign up date </mat-header-cell>
            <mat-cell *matCellDef="let event"> {{event.last_sign_up_date}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="created_at">
            <mat-header-cell *matHeaderCellDef> Created at </mat-header-cell>
            <mat-cell *matCellDef="let event"
                      matTooltip="Updated at: {{event.updated_at}}">
                {{event.created_at}}
            </mat-cell>
        </ng-container>
        
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row [routerLink]="['/events', event.id]" *matRowDef="let event; columns: displayedColumns;"></mat-row>
    
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

export class EventListViewComponent implements OnInit, OnDestroy
{
    displayedColumns = ['id', 'name', 'event_date', 'last_sign_up_date', 'created_at'];

    eventDateSource: EventsDataSource;
    database: EventDatabase;

    @Input() events$: Observable<Event[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
        this.database = new EventDatabase();
    }

    ngOnInit():void {
        this.database.setData(this.events$);
        this.eventDateSource = new EventsDataSource(this.database, this.paginator);
    }

    ngOnDestroy(): void {
        this.eventDateSource.disconnect();
        this.eventDateSource = undefined;
    }
}

class EventsDataSource extends DataSource<Event> {
    constructor(private _database: EventDatabase, private _paginator: MatPaginator) {
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

    length() {
        const data = this._database.data.slice();
        return data.length;
    }
}

class EventDatabase {
    dataChange: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

    get data(): Event[] { return this.dataChange.value; }

    constructor() {}

    setData(event$: Observable<Event[]>): void {
        event$.subscribe(this.dataChange);
    }
}