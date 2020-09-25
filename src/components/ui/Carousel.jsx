import React, { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-interval="10000">
            <div class="d-block w-100">
              <h4>Creation:</h4>
              <strong>Create an account at:</strong>{" "}
              <a href="https://wildalmonds.com/signup">Signup</a>
              <br />
              Once you have an account, the Create Tournament option is
              available from the Owner Page. Currently, the Create page allows
              you a free 4x4x4 Survey: 4 Almonds 4 Squares and 4 invites. We can
              easily create you a custom Survey outside the Demo restrictions.
            </div>
          </div>
          <div class="carousel-item" data-interval="2000">
            <div class="d-block w-100">
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
          </div>
          <div class="carousel-item">
            <div class="d-block w-100">
              <h4>Participation:</h4>
              Your participants receive within the email their own unique link
              to your WildAlmonds Event. Clicking the link sends them to our
              site where they are greeted with your survey owner and the
              description summary of what the survey is about. There, they
              choose the Accept button to link to the Event page. This page
              allows your participant to rank their choices via Almonds for your
              Squares. This is done via touchscreen or mouse by dragging the
              Almonds above the Square and releasing it. Once all picks are
              completed, the participant receives the Lock Picks button. More
              detail are available here at{" "}
              <a href="https://wildalmonds.com/about/help">How to Play</a>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleInterval"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleInterval"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    );
  };
}

export default Carousel;

{
  /* 
   <div
      id="carouselExampleInterval"
      class="carousel slide"
      data-ride="carousel"
      >

  <div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-interval="10000">
      <div class="d-block w-100">
      <h4>Creation:</h4>
                <strong>Create an account at:</strong>{" "}
                <a href="https://wildalmonds.com/signup">Signup</a>
                <br />
                Once you have an account, the Create Tournament option is
                available from the Owner Page. Currently, the Create page allows
                you a free 4x4x4 Survey: 4 Almonds 4 Squares and 4 invites. We
                can easily create you a custom Survey outside the Demo
                restrictions.
    </div>
    <div class="carousel-item" data-interval="2000">
      <div class="d-block w-100">
      <h4>Invitation:</h4>
                Now that you have completed the Creation phase, you are ready to
                send your invitations to your participants. In the Owner
                Dashboard, you will see your Tournament board. Click or touch
                the Dashboard button. This displays your voting results as well
                as your invite cards. Invites are sent via Email from the
                support@wildalmonds.com account. Please have your invitees
                search for a message from this sender. Fill that out for a new
                user and hit the <strong>Send It!</strong> button.
    </div>
    <div class="carousel-item">
      <div class="d-block w-100">
      <h4>Participation:</h4>
                Your participants receive within the email their own unique link
                to your WildAlmonds Event. Clicking the link sends them to our
                site where they are greeted with your survey owner and the
                description summary of what the survey is about. There, they
                choose the Accept button to link to the Event page. This page
                allows your participant to rank their choices via Almonds for
                your Squares. This is done via touchscreen or mouse by dragging
                the Almonds above the Square and releasing it. Once all picks
                are completed, the participant receives the Lock Picks button.
                More detail are available here at{" "}
                <a href="https://wildalmonds.com/about/help">How to Play</a>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> */
}
