
import * as fromRoot from '../../reducers';
import * as fromCharacter from "./character";
import * as fromCharacterClass from "./character_class";

export interface CharacterState {
    character: fromCharacter.State,
    character_class: fromCharacterClass.State
}

export interface State extends fromRoot.State {
    'character': CharacterState;
}

export const reducers = {
    'character': fromCharacter.reducer,
    'character_class': fromCharacterClass.reducer
};