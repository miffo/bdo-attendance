import {Component, Input, OnDestroy, OnInit} from "@angular/core";

import {Afk} from "../models/afk";

@Component({
    selector: 'afk-detail-view',
    template: `
<div>
    User:
    <span [routerLink]="['/users', afk.user.id]"
          matTooltip="Character: {{afk.user.default_character.name}}({{afk.user.default_character.class_name}})">
        {{afk.user.name}}
    </span>

    Reason:
    <span>
        {{afk.reason}}
    </span>
    
    From date:
    <span>
        {{afk.from_date}}
    </span>
    
    To date:
    <span>
        {{afk.to_date}}
    </span>
    
    created at:
    <span matTooltip="Updated: {{afk.updated_at}}">
        {{afk.created_at}}
    </span>
</div>`,
    styles: [``]
})
export class AfkDetailViewComponent implements OnInit, OnDestroy
{
    @Input() afk:Afk;

    ngOnInit():void {
    }

    ngOnDestroy():void {
    }
}