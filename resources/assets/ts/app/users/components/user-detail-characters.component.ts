import {Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";

import {Character} from "../../characters/models/character";

import {UserCharactersDatabase} from "./user-detail.component";

@Component({
    selector: 'user-detail-characters',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let character"> {{character.id}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
            <mat-cell *matCellDef="let character"> {{character.name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="level">
            <mat-header-cell *matHeaderCellDef> Level </mat-header-cell>
            <mat-cell *matCellDef="let character"> {{character.level}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="class_name">
            <mat-header-cell *matHeaderCellDef> Class </mat-header-cell>
            <mat-cell *matCellDef="let character"> {{character.class_name}} </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
        <mat-row [routerLink]="['/characters', character.id]" *matRowDef="let character; columns: displayColumns;"></mat-row>

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
export class UserDetailCharactersComponent implements OnInit, OnDestroy
{
    displayColumns = ['name', 'level', 'class_name'];
    dataSource:CharactersDataSource | null;
    @Input() database:UserCharactersDatabase;
    @Input() @ViewChild(MatPaginator) paginator:MatPaginator;

    ngOnInit() {
        this.dataSource = new CharactersDataSource(this.database, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}

class CharactersDataSource extends DataSource<Character> {
    constructor(private _database:UserCharactersDatabase, private _paginator:MatPaginator) {
        super();
    }

    connect(): Observable<Character[]> {
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