import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";

import {User} from "../../users/models/user";
import {EventUsersDatabase} from "./event-detail.component";

@Component({
    selector: 'event-detail-attendees',
    template: `
        <div>
            <mat-table #table [dataSource]="dataSource">
                <ng-container matColumnDef="id">
                    <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
                    <mat-cell *matCellDef="let user"> {{user.id}} </mat-cell>
                </ng-container>

                <ng-container matColumnDef="name">
                    <mat-header-cell *matHeaderCellDef> Username </mat-header-cell>
                    <mat-cell *matCellDef="let user"
                              matTooltip="Charactar:{{user.default_character.name}}({{user.default_character.class_name}})">
                            {{user.name}}
                    </mat-cell>
                </ng-container>

                <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
                <mat-row [routerLink]="['/users', user.id]" *matRowDef="let user; columns: displayColumns;"></mat-row>

            </mat-table>
            <mat-paginator #paginator
                           [length]="usersDatabase.data.length"
                           [pageIndex]="0"
                           [pageSize]="5"
                           [pageSizeOptions]="[5, 10, 25, 50]">
            </mat-paginator>
        </div>`,
    styles: [`
    `]
})
export class EventDetailAttendeesComponent implements OnInit, OnDestroy
{
    displayColumns = ['name'];
    dataSource: UsersDataSource | null;
    @Input() usersDatabase: EventUsersDatabase;
    @Input() @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.dataSource = new UsersDataSource(this.usersDatabase, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}

class UsersDataSource extends DataSource<User> {
    constructor(private _database: EventUsersDatabase, private _paginator: MatPaginator) {
        super();
    }

    connect(): Observable<User[]> {
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