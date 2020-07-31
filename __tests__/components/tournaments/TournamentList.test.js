import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { compose } from 'redux';
import TournamentList from '../../../src/components/ui/TournamentList';

jest.mock('../../../src/components/ui/Tournament', () =>
  ({ rating, onRate = f => f, onRemove = f => f }) =>
    (<div className="mock-tournament">
      <button className="rate" onClick={() => onRate(rating)} />
      <button className="remove" onClick={onRemove} />
     </div>));

describe('<TournamentList /> UI Component', () => {
  afterAll(() => jest.resetAllMocks());

  describe('Rendering UI', () => {
    it('Renders Correctly', () =>
      compose(expect, toJSON, shallow)(<TournamentList tournaments={_testTournaments} />).toMatchSnapshot());

    it('Defaults Properties correctly', () =>
      expect(shallow(<TournamentList />).find('p').text())
        .toBe('No Tournaments Listed. (Add a Tournament)'));
  });
});
