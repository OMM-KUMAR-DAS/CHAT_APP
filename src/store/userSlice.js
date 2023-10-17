const {createSlice} =require("@reduxjs/toolkit")

const initialState=[]

const userSlice= createSlice({
    name: 'userinformation',

    initialState,
       
    reducers: {

        add(state,action) {
            state.push(action.payload)
        },
    }
})

export const {add} = userSlice.actions

export default userSlice.reducer