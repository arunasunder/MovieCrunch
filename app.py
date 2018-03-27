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
from sqlalchemy import and_
from sqlalchemy import func

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
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path, Movie.release_date).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}
    million_unit = 1000000.0

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        # Convert gross revenue and budget (in millions)
        row["revenue"] = float(result[1]) / (million_unit)
        row["budget"] = float(result[2]) / (million_unit)
        row["profit"] = (float(result[1]) - float(result[2])) / (million_unit)
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        row["release_date"] = str(result[6])
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

@app.route("/movie_profit_rating_2017")
def movie_profit_rating_2017():
    """Return emoji score and emoji char"""

    # query for the top 10 revenue movie data
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path, Movie.release_date).\
        filter(Movie.release_date.like('%17')).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}
    million_unit = 1000000.0

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        # Convert gross revenue and budget (in millions)
        row["revenue"] = float(result[1]) / (million_unit)
        row["budget"] = float(result[2]) / (million_unit)
        row["profit"] = (float(result[1]) - float(result[2])) / (million_unit)
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        row["release_date"] = str(result[6])
        array_list.append(row)

    return jsonify(array_list)

@app.route("/movie_profit_rating_2016")
def movie_profit_rating_2016():
    """Return emoji score and emoji char"""

    # query for the top 10 revenue movie data
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path, Movie.release_date).\
        filter(Movie.release_date.like('%16')).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}
    million_unit = 1000000.0

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        # Convert gross revenue and budget (in millions)
        row["revenue"] = float(result[1]) / (million_unit)
        row["budget"] = float(result[2]) / (million_unit)
        row["profit"] = (float(result[1]) - float(result[2])) / (million_unit)
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        row["release_date"] = str(result[6])
        array_list.append(row)

    return jsonify(array_list)

@app.route("/movie_profit_rating_2015")
def movie_profit_rating_2015():
    """Return emoji score and emoji char"""

    # query for the top 10 revenue movie data
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path, Movie.release_date).\
        filter(Movie.release_date.like('%15')).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}
    million_unit = 1000000.0

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        # Convert gross revenue and budget (in millions)
        row["revenue"] = float(result[1]) / (million_unit)
        row["budget"] = float(result[2]) / (million_unit)
        row["profit"] = (float(result[1]) - float(result[2])) / (million_unit)
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        row["release_date"] = str(result[6])
        array_list.append(row)

    return jsonify(array_list)

@app.route("/movie_profit_rating_2014")
def movie_profit_rating_2014():
    """Return emoji score and emoji char"""

    # query for the top 10 revenue movie data
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path, Movie.release_date).\
        filter(Movie.release_date.like('%14')).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}
    million_unit = 1000000.0

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        # Convert gross revenue and budget (in millions)
        row["revenue"] = float(result[1]) / (million_unit)
        row["budget"] = float(result[2]) / (million_unit)
        row["profit"] = (float(result[1]) - float(result[2])) / (million_unit)
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        row["release_date"] = str(result[6])
        array_list.append(row)

    return jsonify(array_list)

@app.route("/movie_profit_rating_2013")
def movie_profit_rating_2013():
    """Return emoji score and emoji char"""

    # query for the top 10 revenue movie data
    results = db.session.query(Movie.vote_average, Movie.revenue, Movie.budget, Movie.original_title, Movie.homepage, Movie.poster_path, Movie.release_date).\
        filter(Movie.release_date.like('%13')).\
        order_by(Movie.revenue.desc()).\
        limit(10).all()

    print(results)

    array_list = []
    #array_element = {}
    million_unit = 1000000.0

    for result in results:
        print (result)
        row = {}
        row["rating"] = result[0]
        # Convert gross revenue and budget (in millions)
        row["revenue"] = float(result[1]) / (million_unit)
        row["budget"] = float(result[2]) / (million_unit)
        row["profit"] = (float(result[1]) - float(result[2])) / (million_unit)
        row["original_title"] = str(result[3])
        row["homepage"] = str(result[4])
        row["poster_path"] = str(result[5])
        row["release_date"] = str(result[6])
        array_list.append(row)

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

@app.route("/top10_movie_by_revenue_2017")
def movie_data_2017():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    results = db.session.query(Movie.original_title, Movie.revenue).\
        filter(Movie.release_date.like('%17')).\
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

@app.route("/top10_movie_by_revenue_2016")
def movie_data_2016():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    results = db.session.query(Movie.original_title, Movie.revenue).\
        filter(Movie.release_date.like('%16')).\
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

@app.route("/top10_movie_by_revenue_2015")
def movie_data_2015():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    results = db.session.query(Movie.original_title, Movie.revenue).\
        filter(Movie.release_date.like('%15')).\
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

@app.route("/top10_movie_by_revenue_2014")
def movie_data_2014():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    results = db.session.query(Movie.original_title, Movie.revenue).\
        filter(Movie.release_date.like('%14')).\
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

@app.route("/top10_movie_by_revenue_2013")
def movie_data_2013():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    results = db.session.query(Movie.original_title, Movie.revenue).\
        filter(Movie.release_date.like('%13')).\
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

@app.route("/total_revenue")
def movie_total_revenue_by_year():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    '''results = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(Movie.budget >= 1000000.0).\
        order_by(Movie.revenue.desc()).\
        all()'''
    #Pulling out budget values that are invalid by filtering out greater >= 1million 
    results_17 = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%17'), Movie.budget >= 1000000.0)).\
        order_by(Movie.revenue.desc()).\
        all()

    results_16 = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%16'), Movie.budget >= 1000000.0)).\
        order_by(Movie.revenue.desc()).\
        all()

    results_15 = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%15'), Movie.budget >= 1000000.0)).\
        order_by(Movie.revenue.desc()).\
        all()

    results_14 = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%14'), Movie.budget >= 1000000.0)).\
        order_by(Movie.revenue.desc()).\
        all()

    results_13 = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%13'), Movie.budget >= 1000000.0)).\
        order_by(Movie.revenue.desc()).\
        all()

    '''print(results)

    print (results_17)
    print (results_16)
    print (results_15)
    print (results_14)
    print (results_13)'''

    # Select the top 10 query results
    #year_info = ["2017", "2016", "2015", "2014", "2013"]
    year_info = ["2013", "2014", "2015", "2016", "2017"]
    #movie_title = [result[0] for result in results]
    revenues = [0, 0, 0, 0, 0]
    '''for result in results:
        revenues[0] = int(result[0]) '''

    for result_total_2017 in results_17:
        revenues[4] = int(result_total_2017[0])

    for result_total_2016 in results_16:
        revenues[3] = int(result_total_2016[0])

    for result_total_2015 in results_15:
        revenues[2] = int(result_total_2015[0])

    for result_total_2014 in results_14:
        revenues[1] = int(result_total_2014[0])

    for result_total_2013 in results_13:
        revenues[0] = int(result_total_2013[0])

    #revenues = [int(result[1]) for result in results]
    for year, total_rev in zip(year_info, revenues):
        print(year, total_rev)

    color_by_year = ['rgba(186, 134, 13, 1)', #green
        'rgba(240, 128, 38, 1)', #purple
        'rgba(186, 47, 13, 1)', #red
        'rgba(128, 144, 194, 1)', #orange
        'rgba(13, 186, 47, 1)'] #brown

    # Generate the plot trace
    plot_trace = {
        "marker": { "color": color_by_year },
        "x": year_info,
        "y": revenues,
        "type": "bar"
    }

    return jsonify(plot_trace)

@app.route("/total_profit")
def movie_total_profit_by_year():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    '''results = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(Movie.budget >= 1000000.0).\
        order_by(Movie.revenue.desc()).\
        all()'''

    #Pulling out budget values that are invalid by filtering out greater >= 1million 
    results_17 = db.session.query(func.sum(Movie.budget), func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%17'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_16 = db.session.query(func.sum(Movie.budget), func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%16'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_15 = db.session.query(func.sum(Movie.budget), func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%15'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_14 = db.session.query(func.sum(Movie.budget), func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%14'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_13 = db.session.query(func.sum(Movie.budget), func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%13'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    '''print(results)

    print (results_17)
    print (results_16)
    print (results_15)
    print (results_14)
    print (results_13)'''

    # Select the top 10 query results
    #year_info = ["2017", "2016", "2015", "2014", "2013"]
    year_info = ["2013", "2014", "2015", "2016", "2017"]
    #movie_title = [result[0] for result in results]
    profit_values = [0, 0, 0, 0, 0]
    '''for result in results:
        revenues[0] = int(result[0]) '''

    for result_total_2017 in results_17:
        profit_values[4] = ( int(result_total_2017[1]) - int(result_total_2017[0]) )

    for result_total_2016 in results_16:
        profit_values[3] = ( int(result_total_2016[1]) - int(result_total_2016[0]) )

    for result_total_2015 in results_15:
        profit_values[2] = ( int(result_total_2015[1]) - int(result_total_2015[0]) )

    for result_total_2014 in results_14:
        profit_values[1] = ( int(result_total_2014[1]) - int(result_total_2014[0]) )

    for result_total_2013 in results_13:
        profit_values[0] = ( int(result_total_2013[1]) - int(result_total_2013[0]) )

    #revenues = [int(result[1]) for result in results]
    for year, total_profit in zip(year_info, profit_values):
        print(year, total_profit)

    color_by_year = ['rgba(186, 134, 13, 1)', #green
        'rgba(240, 128, 38, 1)', #purple
        'rgba(186, 47, 13, 1)', #red
        'rgba(128, 144, 194, 1)', #orange
        'rgba(13, 186, 47, 1)'] #brown

    # Generate the plot trace
    plot_trace = {
        "marker": { "color": color_by_year },
        "x": year_info,
        "y": profit_values,
        "type": "bar"
    }

    return jsonify(plot_trace)


@app.route("/total_budget")
def movie_total_budget_by_year():
    """Return emoji score and emoji char"""
    # query for the top 10 revenue movie data
    '''results = db.session.query(func.sum(Movie.revenue), func.count(Movie.original_title)).\
        filter(Movie.budget >= 1000000.0).\
        order_by(Movie.revenue.desc()).\
        all()'''

    #Pulling out budget values that are invalid by filtering out greater >= 1million 
    results_17 = db.session.query(func.sum(Movie.budget), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%17'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_16 = db.session.query(func.sum(Movie.budget), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%16'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_15 = db.session.query(func.sum(Movie.budget), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%15'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_14 = db.session.query(func.sum(Movie.budget), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%14'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    results_13 = db.session.query(func.sum(Movie.budget), func.count(Movie.original_title)).\
        filter(and_(Movie.release_date.like('%13'), Movie.budget >= 1000000.0)).\
        order_by(Movie.budget.desc()).\
        all()

    '''print(results)

    print (results_17)
    print (results_16)
    print (results_15)
    print (results_14)
    print (results_13)'''

    # Select the top 10 query results
    #year_info = ["2017", "2016", "2015", "2014", "2013"]
    year_info = ["2013", "2014", "2015", "2016", "2017"]
    #movie_title = [result[0] for result in results]
    budget_values = [0, 0, 0, 0, 0]
    '''for result in results:
        revenues[0] = int(result[0]) '''

    for result_total_2017 in results_17:
        budget_values[4] = int(result_total_2017[0])

    for result_total_2016 in results_16:
        budget_values[3] = int(result_total_2016[0])

    for result_total_2015 in results_15:
        budget_values[2] = int(result_total_2015[0])

    for result_total_2014 in results_14:
        budget_values[1] = int(result_total_2014[0])

    for result_total_2013 in results_13:
        budget_values[0] = int(result_total_2013[0])

    #revenues = [int(result[1]) for result in results]
    for year, total_budget in zip(year_info, budget_values):
        print(year, total_budget)

    color_by_year = ['rgba(186, 134, 13, 1)', #green
        'rgba(240, 128, 38, 1)', #purple
        'rgba(186, 47, 13, 1)', #red
        'rgba(128, 144, 194, 1)', #orange
        'rgba(13, 186, 47, 1)'] #brown

    # Generate the plot trace
    plot_trace = {
        "marker": { "color": color_by_year },
        "x": year_info,
        "y": budget_values,
        "type": "bar"
    }

    return jsonify(plot_trace)



'''
@app.route("/scatter_plot_test")
def movie_scatter_plot():
    return render_template("movietest.html")




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
