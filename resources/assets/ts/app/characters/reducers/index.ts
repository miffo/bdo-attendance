
import * as fromRoot from '../../reducers';
import * as fromCharacter from "./character";
import * as fromCharacterClass from "./character_class";
import {createFeatureSelector, createSelector} from "@ngrx/store";

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

export const getCharactersState = createFeatureSelector<CharacterState>('characters');

export const getCharacterState = createSelector(
    getCharactersState,
    (state) => state.character
);

export const getSelectedCharacter = createSelector(
    getCharacterState,
    (state) => state.character
);

export const getCharacterClassState = createSelector(
    getCharactersState,
    (state) => state.character_class
);

export const getCharacterClasses = createSelector(
    getCharacterClassState,
    (state) => state.CharacterClasses
);
