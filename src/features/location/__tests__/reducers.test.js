import { locationsReducer } from "../reducers";
import FETCH_LOCATIONS_TYPES from '../types';

describe('locationsReducer Reducer', () => {
  it('should return the initial state', () => {
    expect(locationsReducer({}, {})).toEqual({});
  });

  it ('should handle fetchlocation fail', () => {
    const locations = locationsReducer({
    }, {
      type: FETCH_LOCATIONS_TYPES.FAILED,
    });
    expect(locations.error.message).toEqual('Unable to load locations');
  });

  it('should add locations to the state', () => {
    const mockLocation = { uuid: '1', display: 'mock-location1 ' };
    const anotherMockLocation = { uuid: '2', display: 'mock-location2' };
    const locations = locationsReducer({
    }, {
      type: FETCH_LOCATIONS_TYPES.SUCCEEDED,
      locations: [
        mockLocation,
        anotherMockLocation
      ]
    });
    expect(locations[0]).toEqual(mockLocation);
    expect(locations[1]).toEqual(anotherMockLocation);
  });
});
