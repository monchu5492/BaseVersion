import React, { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className="container">
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" id="crsl-itm">
              <h4>Creation:</h4>
              <strong>Create an account at:</strong>{" "}
              <a href="https://wildalmonds.com/signup">Signup</a>
              <br />
              Once you have an account, the Create Tournament option is
              available from the Owner Page. Currently, the Create page allows
              you a free 4x4x4 Survey: 4 Almonds 4 Squares and 4 invites. We can
              easily create you a custom Survey outside the Demo restrictions.
            </div>
            <div class="carousel-item" id="crsl-itm">
              <h4>Invitation:</h4>
              Now that you have completed the Creation phase, you are ready to
              send your invitations to your participants. In the Owner
              Dashboard, you will see your Tournament board. Click or touch the
              Dashboard button. This displays your voting results as well as
              your invite cards. Invites are sent via Email from the
              support@wildalmonds.com account. Please have your invitees search
              for a message from this sender. Fill that out for a new user and
              hit the <strong>Send It!</strong> button.
            </div>
            <div class="carousel-item" id="crsl-itm">
              <img src="..." class="d-block w-100" alt="..."></img>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleFade"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleFade"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  };
}

export default Carousel;
