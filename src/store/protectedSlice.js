const {createSlice} =require("@reduxjs/toolkit")

const initialState={
    logged:"false"
}

const protectedSlice= createSlice({
    name: 'protected',

    initialState,
       
    reducers: {

        gett(state,action) {
            state.logged=action.payload
        },
    }
})

export const {gett} = protectedSlice.actions

export default protectedSlice.reducer