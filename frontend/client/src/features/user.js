import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated:false,
  user:null,
  userinfo:{},
  token:"",
  updateflag:false,
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
      state.userinfo = "";
		state.updateflag = false;
    },
    setToken:(state,action)=>{
		state.token = action.payload;
    },
    setUserInfo:(state,action)=>{
		state.userinfo = action.payload;
		state.updateflag = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetRegistered, setLogin, setUser, setLogout, setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer