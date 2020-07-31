import WA from '../../src/constants';
import storeFactory from '../../src/store/index';
import { dropToken } from '../../src/actions';

describe('dropToken', () => {
  let store;
  const picks = [
    {
      id: 1,
      square: 3,
      timestamp: new Date().toString(),
    },
    {
      id: 2,
      square: 2,
      timestamp: new Date().toString(),
    },
    {
      id: 3,
      square: 7,
      timestamp: new Date().toString(),
    },
  ];

  beforeAll(() => {
    store = storeFactory();
    store.dispatch(dropToken(13, 1));
  });

  afterAll(() => global.localStorage['redux-store'] = false);

  it('should make new picks', () =>
    expect(picks.length).toBe(3));
});
