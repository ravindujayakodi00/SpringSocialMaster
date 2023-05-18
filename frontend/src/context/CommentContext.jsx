import { createContext, useReducer } from "react";

export const CommentContext = createContext();

export const commentReducer = (state, action) => {
    switch (action.type){
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        //get a single comment
        case 'GET_COMMENT':
            return {   
                comments: state.comments.find((comment) => comment._id === action.payload._id)
            }    
        case 'CREATE_COMMENT':
            return {
                comments: [action.payload, ...state.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((comment) => comment._id !== action.payload._id)
            }
        case 'UPDATE_COMMENT':
            return {
                comments: state.comments.map((comment) => comment._id === action.payload._id ? action.payload : comment)
            }  
        default:
            return state;
    }
}

export const CommentContextProvider = ({ children }) => {

    const [ state, dispatch] = useReducer(commentReducer, {
        comments: null,
    })

    return (
        <CommentContext.Provider value={{...state, dispatch}}>
            {children}
        </CommentContext.Provider>
    )
};