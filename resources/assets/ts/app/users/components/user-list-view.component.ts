import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material";

import {User} from "../models/user";

@Component({
    selector: 'user-list-view',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.id}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="family_name">
            <mat-header-cell *matHeaderCellDef> Family name</mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.family_name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="email">
            <mat-header-cell *matHeaderCellDef> E-mail </mat-header-cell>
            <mat-cell *matCellDef="let user"> {{user.email}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="created_at">
            <mat-header-cell *matHeaderCellDef> Created at </mat-header-cell>
            <mat-cell *matCellDef="let user"
                      matTooltip="Updated at: {{user.updated_at}}">
                {{user.created_at}}
            </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row [routerLink]="['/users', user.id]" *matRowDef="let user; columns: displayedColumns;"></mat-row>

    </mat-table>
    <mat-paginator #paginator
                   [length]="database.data.length"
                   [pageIndex]="0"
                   [pageSize]="5"
                   [pageSizeOptions]="[5, 10, 25, 50]">
    </mat-paginator>
</div>`,
    styles: [``]
})
export class UserListViewComponent implements OnInit, OnDestroy
{
    displayedColumns = ['id', 'name', 'family_name', 'email', 'created_at'];

    database:UsersDatabase;
    dataSource:UsersDataSource;

    @Input() users$:Observable<User[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
        this.database = new UsersDatabase();
    }

    ngOnInit():void {
        this.database.setData(this.users$);
        this.dataSource = new UsersDataSource(this.database, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}

class UsersDataSource extends DataSource<User>
{
    constructor(private _database: UsersDatabase, private _paginator: MatPaginator) {
        super();
    }

    connect(): Observable<User[]> {
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

    disconnect(): void {
    }
}

class UsersDatabase
{
    dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    get data(): User[] { return this.dataChange.value; }

    constructor() {}

    setData(event$: Observable<User[]>): void {
        event$.subscribe(this.dataChange);
    }
}