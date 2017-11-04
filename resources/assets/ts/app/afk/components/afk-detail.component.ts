import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

import {Afk} from "../models/afk";
import {Event} from "../../events/models/event";

import {EventsDatabase} from "../../shared/components/events-list.component";

@Component({
    selector: 'afk-detail',
    template: `
<mat-grid-list rows="1" cols="2" rowHeight="400px">
    <mat-grid-tile>
        <mat-grid-tile-header>Details</mat-grid-tile-header>
        <afk-detail-view [afk]="afk$ | async"></afk-detail-view>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Missed Events</mat-grid-tile-header>
        <events-list [displayColumns]="eventDisplayColumns" [database]="eventsDatabase"></events-list>
    </mat-grid-tile>
</mat-grid-list>`,
    styles: [``],
})
export class AfkDetailComponent implements OnInit, OnDestroy
{
    @Input() afk$:Observable<Afk>;
    eventDisplayColumns:string[] = ['event_name', 'event_date'];
    eventsDatabase:AfkEventsDatabase;

    constructor() {
        this.eventsDatabase = new AfkEventsDatabase();
    }

    ngOnInit():void {
        this.eventsDatabase.setData(this.afk$);
    }

    ngOnDestroy():void {

    }
}

class AfkEventsDatabase implements EventsDatabase<Afk>
{
    dataChange:BehaviorSubject<Afk> = new BehaviorSubject<Afk>(new Afk());

    get data():Event[] { return this.dataChange.value.affected_events};

    setData(afk$:Observable<Afk>):void {
        afk$.subscribe(this.dataChange);
    }
}