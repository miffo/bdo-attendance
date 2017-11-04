import {Component, Input, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, Observable} from "rxjs";

import {SignUp} from "../../sign_ups/models/sign_up";

@Component({
    selector: 'sign-ups-list',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let signUp"> {{signUp.id}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="user_name">
            <mat-header-cell *matHeaderCellDef> Username </mat-header-cell>
            <mat-cell *matCellDef="let signUp" 
                      matTooltip="Character: {{signUp.character.name}}({{signUp.character.class_name}})">
                    {{signUp.user.name}}
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="character_name">
            <mat-header-cell *matHeaderCellDef> Character name </mat-header-cell>
            <mat-cell *matCellDef="let signUp"
                      matTooltip="Class: {{signUp.character.class_name}}">
                    {{signUp.character.name}}
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="event_name">
            <mat-header-cell *matHeaderCellDef> Event name </mat-header-cell>
            <mat-cell *matCellDef="let signUp"> {{signUp.event.name}} </mat-cell>
        </ng-container>
        
        <ng-container matColumnDef="attending">
            <mat-header-cell *matHeaderCellDef> Attending </mat-header-cell>
            <mat-cell *matCellDef="let signUp"> {{signUp.attending}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="created_at">
            <mat-header-cell *matHeaderCellDef> Created at </mat-header-cell>
            <mat-cell *matCellDef="let signUp"
                      matTooltip="Updated at: {{signUp.updated_at}}">
                {{signUp.created_at}}
            </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
        <mat-row [routerLink]="['/signUps', signUp.id]" *matRowDef="let signUp; columns: displayColumns;"></mat-row>

    </mat-table>
    <mat-paginator #paginator
                   [length]="signUpDatabase.data.length"
                   [pageIndex]="0"
                   [pageSize]="5"
                   [pageSizeOptions]="[5, 10, 25, 50]">
    </mat-paginator>
</div>`,
    styles: [`
    `]
})
export class SignUpsListComponent implements OnInit, OnDestroy
{
    dataSource:SignUpsDataSource | null;
    @Input() displayColumns:string[];
    @Input() signUpDatabase:SignUpsDatabase<any>;
    @ViewChild(MatPaginator) paginator:MatPaginator;

    ngOnInit() {
        this.dataSource = new SignUpsDataSource(this.signUpDatabase, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}


class SignUpsDataSource extends DataSource<SignUp> {
    constructor(private _database: SignUpsDatabase<any>, private _paginator: MatPaginator) {
        super();
    }

    connect(): Observable<SignUp[]> {
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


export interface SignUpsDatabase<T> {
    dataChange:BehaviorSubject<T>
    data:SignUp[];
}