# Cinescreen

Main project in Shekeem Joseph's programming portfolio. Built with React, Supabase and Styled Components.
Cinescreen is a movie / tv show info and rating site based off of Metacritic and Imdb, where users can look up info on different titles that they are interested in and bookmark or rate them.

TECHNOLOGY DECISIONS
Routing - React Router, The standard for React Single Page Applications

Styling - Styled Components, Very popular way of writing component-scoped CSS, right inside JavaScript

Remote state management - REACT QUERY - The best way of managing remote state, with features like caching, automatic re-fetching, pre-fetching, offline support, etc.

Context API - There is almost no UI state needed in this app, so a simple context with useState was enough. No need for Redux.

React Hook Form Handling bigger forms can be a lot of work, such as manual state creation and error handling. A library can simply handle all of this.

Supabase - Service that allows me to easily create a back-end with a Postgres database. Automatically creating a database and API so that I can easily request and recieve data from the server. 

Other tools - React icons, React hot toast
