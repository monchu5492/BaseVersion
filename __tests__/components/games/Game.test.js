import toJSON from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { compose } from 'redux';
import Game from '../../../src/components/ui/Game';


describe('<Game /> UI Component', () => {
  const shallowExpect = compose(expect, toJSON, shallow);

  it('Renders correct properties', () =>
    shallowExpect(<Game
      description="Test Game"
      id={1}
      name="First Name"
      tournament={2}
      wildalmond={20}
    />).toMatchSnapshot());

  it('Invokes onClick', () => {
    mount(<Game description="Test Game" id={1} name="First Name" tournament={2} wildalmond={20} />)
      .find('button')
      .simulate('click');
  });
});

/*
mysql> describe game;
+------------------+---------------------------+------+-----+---------+----------------+
| Field            | Type                      | Null | Key | Default | Extra          |
+------------------+---------------------------+------+-----+---------+----------------+
| game_id          | int(10) unsigned zerofill | NO   | PRI | NULL    | auto_increment |
| tournament_id    | int(10) unsigned zerofill | YES  | MUL | NULL    |                |
| game_name        | char(40)                  | NO   |     | NULL    |                |
| game_description | text                      | YES  |     | NULL    |                |
| game_wildalmond  | int(11)                   | YES  |     | NULL    |                |
+------------------+---------------------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)

mysql>
 */
