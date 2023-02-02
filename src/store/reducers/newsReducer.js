import { FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_ERROR } from "../type";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export default function newsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case FETCH_NEWS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
