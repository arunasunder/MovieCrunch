import datetime as dt
import numpy as np
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# The database URI
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///Data/MovieDB3.sqlite"

db = SQLAlchemy(app)

class Movie(db.Model):
    __tablename__ = 'Movies'

    budget = db.Column(db.Float)
    genres = db.Column(db.String)
    homepage = db.Column(db.String)
    id = db.Column(db.Integer, primary_key=True)
    imdb_id = db.Column(db.Integer)
    original_title = db.Column(db.String) 
    overview = db.Column(db.String) 
    popularity = db.Column(db.Float)
    poster_path = db.Column(db.String)
    production_companies = db.Column(db.String)
    production_countries = db.Column(db.String)
    release_date = db.Column(db.String) #db.Column(db.datetime, nullable=False, default=datetime.utcnow)  #
    revenue = db.Column(db.Float)
    runtime = db.Column(db.Integer)
    status = db.Column(db.String)
    tagline = db.Column(db.String) 
    title = db.Column(db.String) 
    vote_average = db.Column(db.Float) 
    vote_count = db.Column(db.Integer) 

    def __repr__(self):
        return '<Movie %r>' % (self.original_title)

'''
# Create database tables
@app.before_first_request
def setup():
    # Recreate database each time for demo
    # db.drop_all()
    # db.create_all()
'''

#################################################
# Flask Routes
#################################################

@app.route("/")
@app.route("/index.html")
def home():
    """Render Home Page."""
    return render_template("index.html")

@app.route("/crunchanalyze")
@app.route("/crunchanalyze.html")
def crunch_analyze():
    return render_template("crunchanalyze.html")

@app.route("/about")
@app.route("/about.html")
def about():
    """Render Home Page."""
    return render_template("about.html")

@app.route("/movie_profit_rating")
def movie_profit_rating():
    """Return emoji score and emoji char"""

    # query for the top 10 revenue movie data
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        row["revenue"] = float(result[1])
        row["budget"] = float(result[2])
        row["profit"] = float(result[1]) - float(result[2])
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        array_list.append(row)

    '''for result in results:
        print(result)
        #first_element = True
        #for elt in result: 
         #   if (first_element):
          #      array_element['rating'] = elt
           #     first_element = False
            #else:
             #   array_element['revenue'] = elt

        array_list.append(result)  ''' 

    # Select the top 10 query results
    '''for (i in range(len(ratings))) {
        array_list.push()

    }
    ratings = [result[0] for result in results]
    revenues = [int(result[1]) for result in results] '''

    # Generate the plot trace
    '''plot_trace = {
        "x": movie_title,
        "y": revenues,
        "type": "bar"
    }

    array_list = {
        "revenue": revenues,
        "ratings": ratings
    } '''

    return jsonify(array_list)

@app.route("/top10_movie_by_revenue")
def movie_data():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    results = db.session.query(Movie.original_title, Movie.revenue).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    # Select the top 10 query results
    movie_title = [result[0] for result in results]
    revenues = [int(result[1]) for result in results]

    # Generate the plot trace
    plot_trace = {
        "x": movie_title,
        "y": revenues,
        "type": "bar"
    }
    return jsonify(plot_trace)



@app.route("/scatter_plot_test")
def movie_scatter_plot():
    return render_template("movietest.html")


'''

@app.route("/emoji_id")
def emoji_id_data():
    """Return emoji score and emoji id"""

    # query for the emoji data using pandas
    query_statement = db.session.query(Emoji).\
    order_by(Emoji.score.desc()).\
    limit(10).statement
    df = pd.read_sql_query(query_statement, db.session.bind)
    
    # Format the data for Plotly
    plot_trace = {
            "x": df["emoji_id"].values.tolist(),
            "y": df["score"].values.tolist(),
            "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/emoji_name")
def emoji_name_data():
    """Return emoji score and emoji name"""

    # query for the top 10 emoji data
    results = db.session.query(Emoji.name, Emoji.score).\
        order_by(Emoji.score.desc()).\
        limit(10).all()
    df = pd.DataFrame(results, columns=['name', 'score'])

    # Format the data for Plotly
    plot_trace = {
            "x": df["name"].values.tolist(),
            "y": df["score"].values.tolist(),
            "type": "bar"
    }
    return jsonify(plot_trace)
'''

if __name__ == '__main__':
    app.run(debug=True)
