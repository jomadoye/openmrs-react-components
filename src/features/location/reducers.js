import * as R from 'ramda';
import FETCH_LOCATIONS_TYPES from "./types";

const initialState = {
  locations: []
};

export const locationsReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_LOCATIONS_TYPES.SUCCEEDED:
      return action.locations;

    case FETCH_LOCATIONS_TYPES.FAILED:
      return {
        error: {
          message: "Unable to load locations"
        }
      };

    default:
      return state;
  }
};

export const getLocations = (state) => state.locations;
