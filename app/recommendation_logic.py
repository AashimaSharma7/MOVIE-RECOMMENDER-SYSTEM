import pickle
import pandas as pd
import difflib
import requests
from flask import jsonify


def fetch_poster(movie_id):
    response = requests.get(
        "https://api.themoviedb.org/3/movie/{}?api_key=ce365e0bb0a3897036362ade305c4a5c".format(
            movie_id
        )
    )
    data = response.json()
    # Check if the 'poster_path' key is present in the response
    if "poster_path" in data and data["poster_path"]:
        return "https://image.tmdb.org/t/p/w500/" + data["poster_path"]
    else:
        # Handle the case where 'poster_path' is None or not present
        return None


def fetch_credits(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjUwYmI5MDcxOWJkZmJlNThhM2FmNTQwNmEzNWMzOSIsInN1YiI6IjY1NTc2OTE4ZWE4NGM3MTA5MjI4YjdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bML7Iy4NPKIw6p5BRRxyvxNzSmxkviT4LcHRl6Bt6Xg",
    }

    response = requests.get(url, headers=headers)
    data = response.json()

    cast = data.get("cast", [])
    crew = data.get("crew", [])

    return cast, crew


def fetch_movie_details(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjUwYmI5MDcxOWJkZmJlNThhM2FmNTQwNmEzNWMzOSIsInN1YiI6IjY1NTc2OTE4ZWE4NGM3MTA5MjI4YjdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bML7Iy4NPKIw6p5BRRxyvxNzSmxkviT4LcHRl6Bt6Xg",
    }
    response = requests.get(url, headers=headers)
    data = response.json()

    genres = data.get("genres", [])
    overview = data.get("overview")
    tagline = data.get("tagline")
    vote_average = data.get("vote_average")
    release_date = data.get("release_date")
    runtime = data.get("runtime")
    adult = data.get("adult")
    backdrop_path = "https://image.tmdb.org/t/p/w500/" + data.get("backdrop_path")

    return (
        genres,
        overview,
        tagline,
        vote_average,
        release_date,
        runtime,
        adult,
        backdrop_path,
    )


def recommend(movie, movies, similarity):
    # list_of_all_titles = jsonify(movies['title'])
    list_of_all_titles = movies["title"].tolist()
    # print("All Titles:", list_of_all_titles)
    find_close_match = difflib.get_close_matches(movie, list_of_all_titles)
    # print("Close Matches:", find_close_match)

    if not find_close_match:
        return [], []  # Return empty lists if no close match is found

    close_match = find_close_match[0]
    index_of_the_movie = movies[movies.title == close_match]["index"].values[0]
    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)

    recommended_movies = []
    recommended_movies_posters = []
    recommended_movies_id = []

    i = 1
    for movie in sorted_similar_movies[1:]:
        index = movie[0]
        title_from_index = movies[movies.index == index]["title"].values[0]
        id_from_index = movies[movies.index == index]["id"].values[0]

        if i < 20:
            recommended_movies.append(title_from_index)
            recommended_movies_posters.append(
                fetch_poster(id_from_index)
            )  # Make sure fetch_poster is defined
            recommended_movies_id.append(id_from_index)
            i += 1

    return recommended_movies, recommended_movies_posters, recommended_movies_id

