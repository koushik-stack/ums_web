import {FETCH_LECTURER_REQUEST, FETCH_LECTURER_SUCCESS, FETCH_LECTURER_FAILURE} from "./LecturerTypes";


const initialState ={
    loading:false,
    data:{},
    error:""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LECTURER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_LECTURER_SUCCESS:
            return {
                data: action.payload,
                error: "",
                loading: false
            };
        case FETCH_LECTURER_FAILURE:
            return {
                data: [],
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default reducer;