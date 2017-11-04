import {Component, Input} from "@angular/core";

import {Character} from "../models/character";

@Component({
    selector: 'character-detail',
    template: `
<div>
    Level:
    <span>
        {{character.level}}
    </span>

    Class:
    <span>
        {{character.character_class.name}}
    </span>
    
    User:
    <span [routerLink]="['/users', character.user.id]">
        {{character.user.name}}
    </span>
    
    created at:
    <span matTooltip="Updated: {{character.updated_at}}">
        {{character.created_at}}
    </span>
</div>`,
    styles: [``],
})
export class CharacterDetailComponent
{
    @Input() character:Character;
}