import React from 'react'
import About from '../components/About/About'
import Announcement from '../components/Announcement/Announcement'
import Stats from '../components/Stats/Stats'
import { News } from '../components/News/News'
import { Events } from '../components/Events/Events'
import { Gallery } from '../components/Gallery/Gallery'
import { Videos } from '../components/Videos/Videos'
import { Contacts } from '../components/Contacts/Contacts'
import { Partners } from '../components/Partners/Partners'

export const HomePage: React.FC = () => {
  return (
    <>
      <Announcement />
      <About />
      <Stats />
      <div className="container">
        <News showTitle addMarginBottom />
      </div>
      <Events />
      <Gallery />
      <Videos />
      <Contacts />
      <Partners />
    </>
  )
}

export default HomePage
