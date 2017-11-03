import * as fromRoot from '../../reducers';
import * as fromAfk from "./afk";

export interface AfkState extends fromRoot.State {
    'afk': fromAfk.State;
}cd 

export const reducers = {
    afk: fromAfk.reducer
};