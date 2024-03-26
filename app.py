from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from app.recommendation_logic import (
    recommend,
    fetch_poster,
    fetch_credits,
    fetch_movie_details,
)
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load movies data
movies_dict = pickle.load(open("movies2_dict.pkl", "rb"))
movies = pd.DataFrame(movies_dict)

# Load similarity data
similarity = pickle.load(open("similarity2.pkl", "rb"))


@app.route("/")
def index():
    return render_template("index.html", movies=movies_dict)


@app.route("/movie_names", methods=["GET"])
def get_movie_names():
    movie_names = movies_dict["title"]
    return jsonify(movie_names)


@app.route("/get_credits/<int:movie_id>", methods=["GET"])
def get_credits(movie_id):
    cast, crew = fetch_credits(movie_id)
    return jsonify({"cast": cast, "crew": crew})


@app.route("/get_movie_details/<int:movie_id>", methods=["GET"])
def get_movie_details(movie_id):
    (
        genres,
        overview,
        tagline,
        vote_average,
        release_date,
        runtime,
        adult,
        backdrop_path,
    ) = fetch_movie_details(movie_id)
    return jsonify(
        {
            "genres": genres,
            "overview": overview,
            "tagline": tagline,
            "vote_average": vote_average,
            "release_date": release_date,
            "runtime": runtime,
            "adult": adult,
            "backdrop_path": backdrop_path,
        }
    )


@app.route("/recommend", methods=["POST"])
def get_recommendations():
    selected_movie_name = request.json.get("selected_movie")
    names, posters, ids = recommend(selected_movie_name, movies, similarity)
    # Convert int64 values to regular Python integers
    id_values = [int(i) for i in ids]
    return jsonify({"names": names, "posters": posters, "id": id_values})


if __name__ == "__main__":
    app.run(debug=True)