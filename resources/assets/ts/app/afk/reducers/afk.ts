import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

import {Afk} from "../models/afk";

import * as afk from "../actions/afk";

export interface State extends EntityState<Afk> {
    selectedAfkId:number|null,
}

export const adapter:EntityAdapter<Afk> = createEntityAdapter<Afk>({
    selectId: (afk:Afk) => afk.id,
    sortComparer: false
});

export const initialState:State = adapter.getInitialState({
    selectedAfkId: null
});

export function reducer(state = initialState, action:afk.Actions):State {
    switch (action.type) {
        case afk.SELECT: {
            return {
                ...state,
                selectedAfkId: action.payload
            }
        }
        case afk.UNSELECT: {
            return {
                ...state,
                selectedAfkId: null
            }
        }
        case afk.LOAD: {
            let newState = {
                ...adapter.addOne(action.payload.afk, state),
                selectedAfkId: state.selectedAfkId
            };
            return {
                ...newState,
                ...adapter.updateOne({id: action.payload.afk.id, changes: action.payload.afk}, state)
            }
        }
        case afk.LOAD_All_SUCCESS: {
            return {
                ...adapter.addMany(action.payload.afk.map(afk => {
                    let newAfk = new Afk(afk.user);
                    newAfk.id = afk.id;
                    newAfk.reason = afk.reason;
                    newAfk.from_date = afk.from_date;
                    newAfk.to_date = afk.to_date;
                    newAfk.created_at = afk.created_at;
                    newAfk.updated_at = afk.updated_at;

                    return newAfk;
                }), state),
                selectedAfkId: state.selectedAfkId
            }
        }
        default: {
            return state;
        }
    }
}

export const getSelectedAfkId = (state:State) => state.selectedAfkId;