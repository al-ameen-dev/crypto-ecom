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
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetRegistered, setLogin, setUser, setLogout } = userSlice.actions

export default userSlice.reducer