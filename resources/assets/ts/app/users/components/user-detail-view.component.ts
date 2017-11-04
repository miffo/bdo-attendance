import {Component, Input, OnDestroy, OnInit} from "@angular/core";

import {User} from "../models/user";

@Component({
    selector: 'user-detail-view',
    template: `
<div>
    Name:
    <span>
        {{user.name}}
    </span>

    Family name:
    <span>
        {{user.family_name}}
    </span>
    
    E-mail:
    <span>
        {{user.email}}
    </span>
    
    Default character:
    <span [routerLink]="['/characters', user.default_character.id]"> 
        {{user.default_character.name}}[{{user.default_character.class_name}}]({{user.default_character.level}})
    </span>

    created at:
    <span matTooltip="Updated: {{user.updated_at}}">
        {{user.created_at}}
    </span>
</div>`,
    styles: [``]
})
export class UserDetailViewComponent implements OnInit, OnDestroy
{
    @Input() user:User;

    ngOnInit():void {
    }

    ngOnDestroy():void {
    }
}