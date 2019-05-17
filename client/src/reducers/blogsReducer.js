import { FETCH_BLOGS } from '../actions/types';

export default (state=[],{type,payload})=>{
  switch(type){
    case FETCH_BLOGS:
      return payload
    default:
      return state
  }
}