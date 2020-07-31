import WA from '../../../src/constants';
import { pick } from '../../../src/store/reducers';
import deepFreeze from 'deep-freeze';

describe('pick Reducer', () => {
  it('DROP_TOKEN success', () => {
    const state = {};
    const action = {
      type: WA.DROP_TOKEN,
      id: 1,
      square: 3,
      timestamp: new Date().toString(),
    };
    // const results = square(state, action)
    deepFreeze(state);
    deepFreeze(action);
    expect(pick(state, action))
      .toEqual({
        id: 1,
        square: 3,
        timestamp: action.timestamp,
      });
  });
  it('MOVE_TOKEN success', () => {
    const state = {
      id: 1,
      square: 3,
      timestamp: new Date().toString(),
    };
    const action = {
      type: WA.MOVE_TOKEN,
      id: 1,
      square: 5,
    };
    deepFreeze(state);
    deepFreeze(action);
    expect(pick(state, action))
      .toEqual({
        id: 1,
        square: 5,
        timestamp: state.timestamp,
      });
  });
});
