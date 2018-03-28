# Movie Cruncher 
## Overview 

Movie Cruncher is our take to be the one stop shop for those movie geeks who want to know what's hot, and at the same time look back at the oldies.

This page was created using various tools including SQLlite backend and API integration all housed on a Flask built application to render different HTML, JS and API routes. Our goal is to tell a story based on metrics we gathered by pulling movie box office hits. On the home page we supplied a portal to view real time movies either currently in, or coming soon to theater. On our Cruncher Analytics page, we store a larger historical dataset, to show yearly revenue and budget trends.

## On the Backend:
- Exposed multiple endpoints for pulling movies by revenue and profit. This was Full stack app using Python Flask SQL alchemy for the app server with endpoints exposed to return dat from the SQLite database
- Pulled a Kaggle dataset and converted csv after cleansing and data munging into a sqlite3 database. Used DB Browser for SQL, an open source user friendlyopne source UI DB tool. After cleansing, there were close to 4800+ records for movies
- Cleansed data before converting. 
- Used Flask SQL Alchemy to create and config engine and connection. Exposed multiple endpoints and returned jsonify data. USed endpints to read the data from sqlite3 DB.
- MovieDB APIs were used to pull latest movies info and render it using D3, bootstrap and CSS.  

## On the UX:
- Used D3 visualization and transition between Profit and Revenue for Scatter plot. Color enhancements consistent on the page.
- On hover, used transtions for showing details on movie as folks hover on movies. 
- Did hover with transition display. 
- Used Plotly interactive chart for sharing revenie and %of Budget amounts. 

## Working on:
A search paginated page to search by genre, year, rating and title
Find current top rated movies near you page (maps)

Check out our team here: https://movie-cruncher.herokuapp.com/about.html 

Checkout our project: https://movie-cruncher.herokuapp.com/ 

## Contributors 
##### Aruna Amaresan: https://www.linkedin.com/in/arunaa/ 
##### Zach Quasney: https://www.linkedin.com/in/zachary-quasney-b033b889/ 
##### Sean Noone: https://www.linkedin.com/in/sean-noone/ 

## Findings:
- For almost top revenue moveis in the last 5 years and overall, the budget was always appx. <= 10% of the revenue. This shows that most of these top performing movies did have high Profit margins
- Discovered that 2017 and 2016 were not years with that much high profit margins compared to other previous years
