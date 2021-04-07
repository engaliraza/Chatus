import {ActionTypes} from '../constant/constant'
const updateRooms = (state = [], action) => {
  if (action.type === ActionTypes.ADDROOM) {
    return [...new Set([...state, action.room])];
  }
  return state;
};
export default updateRooms;
