import {Component, Input, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";

import {Event} from "../models/event";

@Component({
    'selector': 'event-list',
    template: `
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
    <mat-row *matRowDef="let event; columns: displayedColumns;"></mat-row>
</mat-table>
    `,
    styles: [`
    `]
})

export class EventListComponent implements OnInit
{
    displayedColumns = ['id', 'name', 'event_date', 'last_sign_up_date', 'created_at'];
    @Input() events$: Observable<Event[]>;
    eventDateSource: EventsDataSource;

    constructor() {

    }
    ngOnInit():void {
        if (!this.eventDateSource)
            this.eventDateSource = new EventsDataSource(this.events$);
    }
}

class EventsDataSource extends DataSource<Event> {
    constructor(private events$: Observable<Event[]>) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Event[]> {
        return this.events$;
    }

    disconnect() {}
}