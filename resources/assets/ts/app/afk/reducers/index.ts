
import * as fromRoot from '../../reducers';

export interface AfkState {
}

export interface State extends fromRoot.State {
    'afk': AfkState;
}

export const reducers = {

};