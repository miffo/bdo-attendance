import {Component, Input} from "@angular/core";

import {SignUp} from "../models/sign_up";

@Component({
    selector: 'sign-up-detail',
    template:`
<div>
    Username:
    <span [routerLink]="['/users', signUp.user.id]">
        {{signUp.user.name}}
    </span>

    Comment:
    <span>
        {{signUp.comment}}
    </span>

    Event:
    <span [routerLink]="['/events', signUp.event.id]">
        {{signUp.event.name}} ({{signUp.event.event_date}})
    </span>

    Character:
    <span [routerLink]="['/characters', signUp.character.id]"> 
        {{signUp.character.name}}[{{signUp.character.class_name}}]({{signUp.character.level}})
    </span>

    created at:
    <span matTooltip="Updated: {{signUp.updated_at}}">
        {{signUp.created_at}}
    </span>
</div>`,
    styles: [``]
})
export class SignUpDetailComponent
{
    @Input() signUp: SignUp;
}