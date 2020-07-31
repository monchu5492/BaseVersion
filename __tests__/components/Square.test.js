import { shallow } from 'enzyme';
import Square from '../../views/Square';

describe('<Square /> UI Component', () => {
  it('renders default square', () =>
    expect(shallow(<Square />).find('div.dropBox').length)
      .toBe(0));

  it('invokes onClick', () => {
    const _click = jest.fn();
    shallow(<Square onClick={_click} />)
      .find('div.dropBox')
      .simulate('click');
    expect(_click).toBeCalled();
  });
});
