import React, { Component } from "react";
import "./movie_list.css";
class Movie extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let data = [];
    data = this.props.data;

    return data !== "none" ? (
      data.map((movie) => (
        <div className="movie-list-items">
          <img
            src={`./img/movies/` + movie["path"] + `.jpg`}
            alt="movie"
            className="movie-list-cover"
          />
          <div className="movie-list-rate">
            <h6>
              {movie["IMDB Rating"]}{" "}
              <span className="from-ten">
                {" "}
                <p>/10</p>
              </span>
            </h6>
          </div>
          <h6 className="movie-list-name">{movie["Title"]}</h6>
          {movie["Major Genre"] !== null ? (
            <h6 className="movie-list-genre">{movie["Major Genre"]}</h6>
          ) : (
            <h6 className="movie-list-genre"> unknown </h6>
          )}
        </div>
      ))
    ) : (
      <div className="no-Content-Found">
        {" "}
        <h1>No Content Found</h1>
      </div>
    );
  }
}

export default Movie;
