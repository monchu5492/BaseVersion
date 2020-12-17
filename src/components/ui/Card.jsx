import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="container">
          <div class="row">
            {/* <!-- Card 1 --> */}
            <div class="col-md-4 card-container">
              <div class="card-flip">
                {/* <!-- Card 1 Front --> */}
                <div class="card front how">
                  <span class="fa fa-4x fa-smile-o text-center"></span>
                  <div class="card-block h4">
                    <h4 class="card-title text-center" id="card-1-h4">
                      How do I setup an event?
                    </h4>
                    {/* <h6 class="card-subtitle mb-2 text-muted text-center">
                      Front Card subtitle
                    </h6>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p> */}
                  </div>
                </div>
                {/* <!-- End Card 1 Front --> */}

                {/* <!-- Card 1 Back --> */}
                <div class="card back">
                  <div class="card-block">
                    {/* <h4 class="card-title">Back Card Title</h4>
                    <h6 class="card-subtitle mb-2 text-muted">
                      Back Card subtitle
                    </h6> */}
                    <p class="card-text" id="card-1-bk-p">
                      Simply create an account by{" "}
                      <em>
                        <b>Signing Up</b>
                      </em>
                      , and you will get access to create your own free event
                      for 4 participants.
                    </p>
                    <p id="card-1-bk-p-2">
                      Your participants only need to provide an email address to
                      participate and have a device that runs a modern web
                      browser.
                    </p>
                    {/* <a href="#" class="card-link">
                      Another link
                    </a> */}
                  </div>
                  <div id="card-1-button">
                    <a
                      href="https://wildalmonds.com/signup"
                      class="card-link btn alert-warning"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
                {/* <!-- End Card 1 Back --> */}
              </div>
            </div>
            {/* <!-- End Card 1 --> */}

            {/* <!-- Card 2 --> */}
            <div class="col-md-4 card-container">
              <div class="card-flip">
                {/* <!-- Card 2 Front --> */}
                <div class="card front">
                  <img
                    src="https://placeimg.com/1080/500/nature"
                    class="card-img-top img-fluid"
                    id="card-2-img"
                  ></img>
                  <div class="card-block">
                    <h4 class="card-title" id="card-2-h4">
                      How does participation work?
                    </h4>
                    {/* <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p> */}
                    {/* <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p> */}
                  </div>
                </div>
                {/* <!-- End Card 2 Front --> */}

                {/* <!-- Card 2 Back --> */}
                <div class="card back">
                  {/* <div class="card-header">Featured</div> */}
                  <div class="card-block">
                    {/* <h4 class="card-title">Special title treatment</h4> */}
                    <h5 class="card-text" id="card-2-h5">
                      Participants simply accept the email invitation the owner
                      has sent then drag and drop their choice of rank to the
                      items available.
                    </h5>
                    {/* <a href="#" class="btn btn-primary">
                      Go somewhere
                    </a> */}
                  </div>
                </div>
                {/* <!-- End Card 2 Back --> */}
              </div>
            </div>
            {/* <!-- End Card 2 --> */}

            {/* <!-- Card 3 --> */}
            <div class="col-md-4 card-container">
              <div class="card-flip">
                {/* <!-- Card 3 Front --> */}
                <div class="card front">
                  <img
                    src="https://placeimg.com/1080/500/arch"
                    class="card-img-top img-fluid"
                    id="card-3-img"
                  ></img>
                  <div class="card-block">
                    <h4 class="card-title" id="card-3-h4">
                      Tell me more!!
                    </h4>
                    <p class="card-text" id="card-3-fnt-p">
                      <b>We’d love to show you a demo!</b>
                    </p>
                  </div>
                  {/* <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                  </ul>
                  <div class="card-block">
                    <p class="card-text">Some more text</p>
                  </div> */}
                </div>
                {/* <!-- End Card 3 Front --> */}

                {/* <!-- Card 3 Back --> */}
                <div class="card back text-center">
                  {/* <div class="card-header">Featured</div> */}
                  <div class="card-block">
                    {/* <h4 class="card-title">Special title treatment</h4> */}
                    <p class="card-text" id="card-3-p">
                      <b>checkout our Media page for more details!</b>
                    </p>
                    <div id="card-3-btn">
                      <a
                        href=" https://wildalmonds.com/about/media"
                        class="btn alert-warning"
                      >
                        Check Us Out
                      </a>
                    </div>
                  </div>
                  {/* <div class="card-footer text-muted">2 days ago</div> */}
                </div>
                {/* <!-- End Card 3 Back --> */}
              </div>
            </div>
            {/* <!-- End Card 3 --> */}
          </div>
        </div>
        ;
      </div>
    );
  }
}

export default Card;

{
  /* <h2>How do I setup an event?</h2>
    <p>
      Simply create an account on the site at https://wildalmonds.com/signup and
      you will get access to create your own free event for 4 participants. Your
      participants only need to provide an email address to participate and have
      a device that runs a modern web browser.
    </p>
    <h2>How does participation work?</h2>
    <p>
      Participants simply accept the email invitation the owner has sent then
      drag and drop their choice of rank tothe items available. Tell me more!!
    </p>
    <p>
      We’d love to show you a demo! Or checkout our Media page for more details
      at
    </p>
    <p>https://wildalmonds.com/about/media</p>
    <h2>Our Services</h2>
    <p>
      Contact wildalmondz@gmail.com to setup a demo or setup an account and give
      it a spin. We can customize based on the existing framework to meet your
      needs at a reasonably negotiated cost.
    </p> */
}
