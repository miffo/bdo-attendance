import * as characterClass from "../actions/character_class";

import {CharacterClass} from "../models/character_class";

export interface State {
    CharacterClasses: CharacterClass[];
}

export const initialState: State = {
    CharacterClasses: []
};

export function reducer(state = initialState, action:characterClass.Actions):State {
    switch (action.type) {
        case characterClass.LOAD_SUCCESS: {
            return {
                CharacterClasses: action.payload.character_classes
            };
        }
        default: {
            return state;
        }
    }
}