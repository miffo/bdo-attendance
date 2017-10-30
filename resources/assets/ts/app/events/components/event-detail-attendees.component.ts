import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {Event} from "../models/event";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {User} from "../../core/types/user";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
    selector: 'event-detail-attendees',
    template: `
<div>
    <mat-table #table [dataSource]="dateSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.id}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef> Username </mat-header-cell>
            <mat-cell *matCellDef="let user">{{user.name}}</mat-cell>
        </ng-container>
        
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row [routerLink]="['/user', user.id]" *matRowDef="let user; columns: displayedColumns;"></mat-row>

    </mat-table>
    <mat-paginator #paginator
                   [length]="dateSource.length()"
                   [pageIndex]="0"
                   [pageSize]="5"
                   [pageSizeOptions]="[5, 10, 25, 50]">
    </mat-paginator>
</div>`,
    styles: [`
    `]
})
export class EventDetailAttendeesComponent implements OnInit {
    displayedColumns = ['name'];

    @Input() event$: Observable<Event>;
    dateSource: UserDataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit():void {
        if (!this.dateSource)
            this.dateSource = new UserDataSource(new EventAttendeesDatabase(this.event$), this.paginator);
    }
}

class UserDataSource extends DataSource<User> {
    constructor(private _database: EventAttendeesDatabase, private _paginator: MatPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<User[]> {
        const displayDataChanges = [
            this._database.dataChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            if (this._database.data) {
                const data = this._database.data.slice();

                // Grab the page's slice of data.
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                return data.splice(startIndex, this._paginator.pageSize);
            }
            return [];
        });
    }

    disconnect() {}

    length() {
        if (this._database.data) {
            const data = this._database.data.slice();
            return data.length;
        }
        return 0;
    }
}

class EventAttendeesDatabase {
    dataChange: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());
    get data(): User[] { return this.dataChange.value.attendees; }

    constructor(events$: Observable<Event>) {
        events$.subscribe(this.dataChange);
    }
}
