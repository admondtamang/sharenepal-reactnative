import { ADD_SHARE, REMOVE_SHARE } from "./shareTypes";

export const addShare = (share) => {
  return {
    type: ADD_SHARE,
    payload: share,
  };
};

export const removeShare = (share) => {
  return {
    type: REMOVE_SHARE,
    payload: share,
  };
};
