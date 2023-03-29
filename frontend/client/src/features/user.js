import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated:false,
  user:null,
  token:"",
  loading:false,
  registered:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: state =>{
      state.registered = false;
    },
    setLogin:(state) =>{
		state.isAuthenticated = true;
		state.registered = true;
    },
    setUser:(state,action) =>{
    	state.user = action.payload;
    },
    setLogout:(state)=>{
      state.isAuthenticated = false;
      state.registered = false;
      state.token = '';
    },
    setToken:(state,action)=>{
		state.token = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetRegistered, setLogin, setUser, setLogout, setToken } = userSlice.actions

export default userSlice.reducer