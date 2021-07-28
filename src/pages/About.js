import React from 'react'
import { Link, useRouteMatch, Route } from "react-router-dom"
import SinglePage from "./SinglePage"

const About = () => {
  const { url, path } = useRouteMatch()   //useRouteMatch() provides access to the match object
  console.log(useRouteMatch())

  //url is part of an object taken from the match object
  //it is used to create a nested link
  //${path} is /about. It is used to create a nested route
  //":slug" matches anything after /about/, so it corresponds to /about/about-app
  //SinglePage is child element. We have access to the :slug through SinglePage
  return (
    <div className="about__content">
      <ul className="about__list">
        <li>
          <Link to={`${url}/about-app`}>About App</Link>
        </li>
        <li>
          <Link to={`${url}/about-author`}>About Author</Link>
        </li>
      </ul>
        <Route path={`${path}/:slug`}>
          <SinglePage />
        </Route>
    </div>
  )
}

export default About
