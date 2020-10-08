import React, { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"
        ></script>
        <div className="container-fluid caro-container">
          <div className="row">
            <div className="col-4">
              <h2 id="faq-h2-2">
                What types of surveys work well on WildAlmonds?
              </h2>
              <p>
                Anywhere you need to get feedback on a select number of options
                or items is a great choice! WildAlmonds really shine when there
                are multiple good options available. Here are a few
                inspirational ideas:
              </p>
            </div>
            <div className="col-8">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      class="d-block w-100"
                      src="https://placeimg.com/1080/500/animals"
                      alt="First slide"
                    ></img>
                    <div class="Caro-div d-none d-md-block">
                      <h5>· Ordering dinner for a large team.</h5>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src="https://placeimg.com/1080/500/arch"
                      alt="Second slide"
                    ></img>
                    <div class="Caro-div d-none d-md-block">
                      <h5>· Choosing a name for a team</h5>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      class="d-block w-100"
                      src="https://placeimg.com/1080/500/nature"
                      alt="Third slide"
                    ></img>
                    <div class="Caro-div d-none d-md-block">
                      <h5>· Making team decisions quickly</h5>
                    </div>
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Carousel;
