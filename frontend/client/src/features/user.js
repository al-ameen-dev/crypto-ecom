import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated:false,
  accessToken:'',
  refreshToken:'',
  user:null,
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
    setToken:(state,action) =>{
		state.accessToken = action.payload.access;
		state.refreshToken = action.payload.refresh;
		state.isAuthenticated = true;
		state.registered = true;
    },
    setUser:(state,action) =>{
    	state.user = action.payload;
    },
    userLogout:(state) =>{
		state.isAuthenticated = false;    
    },
  },
})

// Action creators are generated for each case reducer function
export const { resetRegistered, setToken, setUser, userLogout } = userSlice.actions

export default userSlice.reducer