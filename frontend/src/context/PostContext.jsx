import { createContext, useReducer } from "react";

export const PostContext = createContext();

export const postReducer = (state, action) => {
    switch (action.type){
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        //get a single post
        case 'GET_POST':
            return {   
                posts: state.posts.find((post) => post._id === action.payload._id)
            }    
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter((post) => post._id !== action.payload._id)
            }
        case 'UPDATE_POST':
            return {
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            }  
        default:
            return state;
    }
}

export const PostContextProvider = ({ children }) => {

    const [ state, dispatch] = useReducer(postReducer, {
        posts: null,
    })

    return (
        <PostContext.Provider value={{...state, dispatch}}>
            {children}
        </PostContext.Provider>
    )
};