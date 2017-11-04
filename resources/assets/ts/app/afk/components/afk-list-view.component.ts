import {Component, Input, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {Afk} from "../models/afk";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'afk-list-view',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
            <mat-cell *matCellDef="let afk"> {{afk.id}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="Username">
            <mat-header-cell *matHeaderCellDef> Username </mat-header-cell>
            <mat-cell *matCellDef="let afk">
                <span matTooltip="Character: {{afk.user.default_character.name}}({{afk.user.default_character.class_name}})">
                    {{afk.user.name}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="reason">
            <mat-header-cell *matHeaderCellDef> Reason</mat-header-cell>
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

        <ng-container matColumnDef="created_at">
            <mat-header-cell *matHeaderCellDef> Created at </mat-header-cell>
            <mat-cell *matCellDef="let afk"><span matTooltip="Updated at: {{afk.updated_at}}"> {{afk.created_at}} </span></mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row [routerLink]="['/afk', afk.id]" *matRowDef="let afk; columns: displayedColumns;"></mat-row>

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
export class AfkListViewComponent
{
    displayedColumns = ['id', 'Username', 'reason', 'from_date', 'to_date', 'created_at'];

    database:AfksDatabase;
    dataSource:AfksDataSource;

    @Input() afk$:Observable<Afk[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor() {
        this.database = new AfksDatabase();
    }

    ngOnInit():void {
        this.database.setData(this.afk$);
        this.dataSource = new AfksDataSource(this.database, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}

class AfksDataSource extends DataSource<Afk>
{
    constructor(private _database: AfksDatabase, private _paginator: MatPaginator) {
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

    disconnect(): void {
    }
}

class AfksDatabase
{
    dataChange: BehaviorSubject<Afk[]> = new BehaviorSubject<Afk[]>([]);

    get data(): Afk[] { return this.dataChange.value; }

    constructor() {}

    setData(event$: Observable<Afk[]>): void {
        event$.subscribe(this.dataChange);
    }
}