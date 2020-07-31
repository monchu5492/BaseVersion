import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { compose } from 'redux';
import GameList from '../../../src/components/ui/GameList';

jest.mock('../../../src/components/ui/Game', () =>
  ({ onRemove = f => f }) =>
    (<div className="mock-game">
      <button className="remove" onClick={onRemove} />
     </div>));

describe('<GameList /> UI Component', () => {
  afterAll(() => jest.resetAllMocks());

  describe('Rendering UI', () => {
    it('Renders Correctly', () =>
      compose(expect, toJSON, shallow)(<GameList games={_testGames} />).toMatchSnapshot());

    it('Defaults Properties correctly', () =>
      expect(shallow(<GameList />).find('p').text())
        .toBe('No Games Listed. (Add a Game)'));
  });
});
