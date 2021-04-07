import {CHANGEVIDEO} from '../constant/constant'
const setVideo = (state = true, action) => (action.type === CHANGEVIDEO ? action.video : state);
export default setVideo;
