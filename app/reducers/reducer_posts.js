import {FETCH_POSTS} from '../actions/index';

const INITIAL_STATE = { all: [], post: null };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            // retorna un nuevo objeto con lo que tenga actualmente state (...state)
            // mas el resultado del http get (action.payload.data).
            return { ...state, all: action.payload.data }
            break;
        default:
            return state;
    }
}
