import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../../../stylesheets/SendInvitePage.scss';
import { InvitePendingId } from '../containers';


const InvitesList = ({
	invites = [], expiretime, expired, gameId, game_id, orders, onFetchAvailableInvites = f => f,
}) =>
	(<div id="invites">
		{(invites.length === 0) ?
			<div>
				<OrderPendingList game_id={game_id} orders={orders} />
			</div> :
			invites.map(invite =>
				(<InvitePendingId
					{...invite}
					key={invite.invite_id}
					marker={invite.marker}
					gamename={invite.name}
					expires={expiretime}
					expired={expired}
					onFetchAvailableInvites={() => onFetchAvailableInvites(gameId)}
				/>))
		}
	</div>);

InvitesList.propTypes = {
	invites: PropTypes.array,
	orders: PropTypes.array,
	expired: PropTypes.string,
	game_id: PropTypes.string.isRequired,
	gameId: PropTypes.string,
	report: PropTypes.array,
	expiretime: PropTypes.string,
	onFetchAvailableInvites: PropTypes.func,
	onSendInvite: PropTypes.func,
};

InvitesList.defaultProps = {
	expiretime: null,
	expired: null,
	gameId: null,
	onSendInvite: f => f,
	onFetchAvailableInvites: f => f,
};

export default withRouter(InvitesList);

//
