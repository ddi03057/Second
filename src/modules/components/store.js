import { configureStore, createSlice } from '@reduxjs/toolkit'
//[99,99,99,99,99,99,99,99,99,99,99,99]
let answerStep1 = createSlice({
  name : 'answerStep1',
  initialState : [99,99,99,99,99,99,99,99,99,99,99,99],
  reducers : {
    changeAnswer(state, props){
      state[props.payload.idx] = props.payload
      return state;
    }
  }
});

export let { changeAnswer } = answerStep1.actions;

export default configureStore({
  reducer: {
    answerStep1 : answerStep1.reducer
  }
}) 