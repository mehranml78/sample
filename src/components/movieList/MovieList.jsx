import React, { Component } from "react";
import Movies from "../../data/data.json";
import Movie from "../../moudels/movie/movie_list";
import { SearchResult } from "../../services/searchService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gsap } from "gsap";
import { Carousel } from "react-bootstrap";
import {
  sortby_director,
  sortby_genre,
  sortby_title,
  sortby_date,
} from "../../services/sortingService";
import {
  faVideo,
  faCalendarMinus,
  faCog,
  faPlay,
  faExclamation,
  faSearch,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/MovieList.css";
class MovieList extends Component {
  state = {
    sortmenu: false,
    sortedby: "All",
    genre: "All",
    data: [],
    searchvalue: "",
  };

  SearchChangeHandler(e) {
    this.setState({ searchvalue: e.target.value });
  }
  SearchResultHandler = () => {
    const searchvalue = this.state.searchvalue;
    const data = SearchResult(Movies, searchvalue);
    data.length !== 0
      ? this.setState({ data })
      : this.setState({ data: "none" });
  };
  SearchResultHandlerEnter(e) {
    if (e.key === "Enter") {
      this.SearchResultHandler();
    }
  }
  movieList_data(Genre = "All") {
    let genre = Genre;
    let data = [];
    let movies = [...Movies];
    if (Genre === "All") {
      data = movies;
      while (data.length >= 15) {
        data.pop();
      }
      this.setState({ genre, data });
    } else {
      movies.filter((movie) => {
        if (movie["Major Genre"] === Genre) {
          data.push(movie);
        }
        return null;
      });
      while (data.length >= 15) {
        data.pop();
      }

      this.setState({ genre, data });
    }
  }

  HighestRate() {
    let data = [];
    data = [...Movies];
    data.sort((a, b) => {
      if (a["IMDB Rating"] < b["IMDB Rating"]) return 1;
      if (a["IMDB Rating"] > b["IMDB Rating"]) return -1;
      return null;
    });
    while (data.length >= 15) {
      data.pop();
    }
    return data;
  }

  Newest() {
    let data = [];
    data = [...Movies];
    data.sort(function (a, b) {
      return new Date(b["Release Date"]) - new Date(a["Release Date"]);
    });
    while (data.length >= 5) {
      data.pop();
    }
    return data;
  }
  Random() {
    let data = [];
    for (let i = 0; i < 11; i++) {
      const movie = Movies[Math.round(Math.random())];
      data.push(movie);
    }
    return data;
  }
  SortMenu = () => {
    const t1 = gsap;
    if (!this.state.sortmenu) {
      t1.to(".movie-menu-sort-btn", {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: "none",
        backgroundColor: "rgb(56, 55, 55)",
      }).duration(0.1);
      t1.to("#sort", { rotateX: 180 });
      t1.to(".movie-menu-sort-box-open", {
        display: "block",
        height: "18vw",
      })
        .delay(0.1)
        .duration(0.3);
      const sortmenu = true;
      this.setState({ sortmenu });
    } else {
      t1.to(".movie-menu-sort-btn", {
        borderBottom: "2px solid rgb(255, 102, 0)",
        borderBottomLeftRadius: "2vw",
        borderBottomRightRadius: "2vw",
        backgroundColor: "transparent",
      }).delay(0.2);
      t1.to("#sort", { rotateX: 0 });

      t1.to(".movie-menu-sort-box-open", {
        display: "none",
        height: "0vw",
      }).duration(0.2);
      const sortmenu = false;
      this.setState({ sortmenu });
    }
  };

  render() {
    const New = this.Newest();
    const Highest = this.HighestRate();
    return (
      <div id="movies">
        <div className="movie-header">
          <Carousel>
            {New.map((movie) => (
              <Carousel.Item>
                <div className="movie-header-slide">
                  <img
                    className="movie-header-slider"
                    src={"./img/movies/" + movie["cover"] + ".jpg"}
                    alt=""
                  />
                  <h2>{movie["Title"]}</h2>
                  <ul className="movie-header-slider-ul">
                    <li>
                      <FontAwesomeIcon
                        icon={faCalendarMinus}
                        color="rgb(255, 102, 0)"
                      />
                      <p> {movie["Release Date"]}</p>
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faVideo}
                        color="rgb(255, 102, 0)"
                      />
                      <p>{movie["Director"]}</p>
                    </li>
                    <li>
                      {" "}
                      <FontAwesomeIcon icon={faCog} color="rgb(255, 102, 0)" />
                      <p>{movie["Major Genre"]}</p>
                    </li>
                  </ul>
                  <button className="movie-header-button watch">
                    <FontAwesomeIcon icon={faPlay} />
                    <p>Watch now</p>
                  </button>
                  <button className="movie-header-button view">
                    <FontAwesomeIcon icon={faExclamation} className="icon" />

                    <p>view detail</p>
                  </button>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="movie-header-slider-gradient"></div>
        </div>
        {/*//////////////////// end of header ///////////////////////////////*/}

        <div className="movie-menu">
          <ul className="movie-menu-list-ul">
            <li
              className="movie-menu-list-li"
              onClick={() => this.movieList_data("All")}
            >
              <h6
                style={
                  this.state.genre === "All"
                    ? { color: "rgb(255, 102, 0)" }
                    : { color: "gray" }
                }
              >
                All
              </h6>
            </li>
            <li
              className="movie-menu-list-li"
              onClick={() => this.movieList_data("Comedy")}
            >
              <h6
                style={
                  this.state.genre === "Comedy"
                    ? { color: "rgb(255, 102, 0)" }
                    : { color: "gray" }
                }
              >
                Comedy
              </h6>
            </li>
            <li
              className="movie-menu-list-li"
              onClick={() => this.movieList_data("Drama")}
            >
              <h6
                style={
                  this.state.genre === "Drama"
                    ? { color: "rgb(255, 102, 0)" }
                    : { color: "gray" }
                }
              >
                Drama
              </h6>
            </li>
            <li
              className="movie-menu-list-li"
              onClick={() => this.movieList_data("Action")}
            >
              <h6
                style={
                  this.state.genre === "Action"
                    ? { color: "rgb(255, 102, 0)" }
                    : { color: "gray" }
                }
              >
                Action
              </h6>
            </li>
          </ul>

          {/* /////////////////searchBox///////////////// */}
          <div className="movie-menu-search-box">
            <div className="movie-menu-search-form">
              <input
                className="movie-menu-search-form-text"
                type="text"
                value={this.state.searchvalue}
                onKeyPress={(e) => this.SearchResultHandlerEnter(e)}
                onChange={(e) => this.SearchChangeHandler(e)}
              />
              <button
                className="movie-menu-search-form-btn"
                onClick={this.SearchResultHandler}
              >
                <FontAwesomeIcon icon={faSearch} className="icon" />
              </button>
            </div>
          </div>
          {/* //////////////////////////////Sortbar//////////////// */}
          <div className="movie-menu-sort-box">
            <div className="movie-menu-sort-btn" onClick={this.SortMenu}>
              <h6>Sort By</h6>
              <FontAwesomeIcon icon={faSortDown} id="sort" className="icon" />
            </div>
            <div className="movie-menu-sort-box-open">
              <ul className="movie-menu-sort-box-open-ul">
                <li
                  onClick={() => {
                    const data = sortby_genre(Movies);
                    this.setState({ data });
                  }}
                >
                  <p>Genre</p>
                </li>
                <li
                  onClick={() => {
                    const data = sortby_director(Movies);
                    this.setState({ data });
                  }}
                >
                  <p>Director</p>
                </li>
                <li
                  onClick={() => {
                    const data = sortby_date(Movies);
                    this.setState({ data });
                  }}
                >
                  <p>Date</p>
                </li>
                <li
                  onClick={() => {
                    const data = sortby_title(Movies);
                    this.setState({ data });
                  }}
                >
                  <p>Name</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* //////////////////////  end of menu //////////////////////////// */}
        <div className="movie-list">
          <Movie
            data={this.state.data.length === 0 ? Highest : this.state.data}
            length={Movies.length}
          />
        </div>
      </div>
    );
  }
}

export default MovieList;
