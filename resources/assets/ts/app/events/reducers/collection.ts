import * as collection from '../actions/collection'

export interface State {
    loaded: boolean;
    loading: boolean;
    ids: number[];
}

const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
};

export function reducer (
    state = initialState,
    action: collection.Actions
): State {
    switch (action.type) {
        case collection.LOAD: {
            return {
                ...state,
                loading:true
            };
        }
        case collection.LOAD_SUCCESS: {
            return {
                loaded:true,
                loading:false,
                ids: action.payload.map(event => event.id)
            };
        }

        case collection.LOAD_FAIL: {
            return {
                ...state,
                loading:false,
                loaded:false
            };
        }
        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
