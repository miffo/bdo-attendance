import {Component, Input, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {MatPaginator} from "@angular/material";
import {DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";

import {SignUp} from "../../sign_ups/models/sign_up";
import {EventSignUpsDatabase} from "./event-detail.component";

@Component({
    selector: 'event-detail-sign-ups',
    template: `
<div>
    <mat-table #table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> id </mat-header-cell>
            <mat-cell *matCellDef="let signUp"> {{signUp.id}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="user_name">
            <mat-header-cell *matHeaderCellDef> Username </mat-header-cell>
            <mat-cell *matCellDef="let signUp">
                <span matTooltip="Character: {{signUp.character.name}}({{signUp.character.class_name}})">
                    {{signUp.user.name}}
                </span>
            </mat-cell>
        </ng-container>

        <ng-container matColumnDef="attending">
            <mat-header-cell *matHeaderCellDef> Attending </mat-header-cell>
            <mat-cell *matCellDef="let signUp"> {{signUp.attending}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="character_name">
            <mat-header-cell *matHeaderCellDef> Character name </mat-header-cell>
            <mat-cell *matCellDef="let signUp"> {{signUp.character.name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="created_at">
            <mat-header-cell *matHeaderCellDef> Created at </mat-header-cell>
            <mat-cell *matCellDef="let signUp"><span matTooltip="Updated at: {{signUp.updated_at}}"> {{signUp.created_at}} </span></mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row [routerLink]="['/signUps', signUp.id]" *matRowDef="let signUp; columns: displayedColumns;"></mat-row>

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
export class EventDetailSignUpsComponent implements OnInit, OnDestroy
{
    displayedColumns = ['attending', 'user_name', 'created_at'];
    dataSource: SignUpsDataSource | null;
    @Input() signUpDatabase: EventSignUpsDatabase;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.dataSource = new SignUpsDataSource(this.signUpDatabase, this.paginator);
    }

    ngOnDestroy(): void {
        this.dataSource.disconnect();
        this.dataSource = undefined;
    }
}


class SignUpsDataSource extends DataSource<SignUp> {
    constructor(private _database: EventSignUpsDatabase, private _paginator: MatPaginator) {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<SignUp[]> {
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
}
