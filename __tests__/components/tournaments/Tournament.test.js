import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { compose } from 'redux';
import Tournament from '../../../src/components/ui/Tournament';


describe('<Tournament /> UI Component', () => {
  const shallowExpect = compose(expect, toJSON, shallow);

  it('Renders correct properties', () =>
    shallowExpect(<Tournament
      id={1}
      name="First Tourney"
    />)
      .toMatchSnapshot());
});
