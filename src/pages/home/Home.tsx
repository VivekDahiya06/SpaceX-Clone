// Import Statements
import { Link } from 'react-router-dom'
import { Button } from '@mantine/core'
import classes from './Home.module.scss'

const Home = () => {

  // Type Definitions
  interface Section_Items_Type {
    h1: string,
    p: string,
    button: string,
    url: string,
    image: string
  }

  
  // Constants
  const Section_Items: Section_Items_Type[] = [
    {
      h1: 'About SpaceX',
      p: 'SpaceX, founded by Elon Musk, is revolutionizing space travel through reusable rocket technology and ambitious missions to Mars and beyond. Discover how the company is reshaping the aerospace industry with groundbreaking innovation, from launch systems to interplanetary ambitions.',
      button: 'About',
      url: '/about',
      image: 'https://live.staticflickr.com/342/18039170043_64fe6c4012_h.jpg'
    },
    {
      h1: 'SpaceX Crew',
      p: "Meet the astronauts and specialists aboard SpaceX missions. From Crew Dragon launches to ISS dockings, learn about the training, missions, and experiences of the people making history as part of SpaceX's human spaceflight program.",
      button: 'Crew',
      url: '/crew',
      image: 'https://live.staticflickr.com/65535/52723823956_7db52d7c61_k.jpg'
    },
    {
      h1: 'SpaceX Rockets',
      p: "Explore the world of SpaceX rockets, from their engineering breakthroughs to their historic missions. Learn about the design, specifications, and evolution of each rocket, and browse through stunning imagery captured during real launches and tests. Whether you're an enthusiast or a researcher, this section offers a comprehensive look at SpaceX's revolutionary advancements in space technology.",
      button: 'Rockets',
      url: '/rockets',
      image: 'https://live.staticflickr.com/65535/52822653443_14ac1655d0_b.jpg'
    },
    {
      h1: 'SpaceX Launches',
      p: "Experience the thrill of SpaceX launches, where cutting-edge technology propels humanity into the cosmos. From the roar of liftoff to the precision of orbital insertion, delve into the missions that are redefining the boundaries of space exploration and expanding our reach beyond Earth.",
      button: 'Launches',
      url: '/launches',
      image: 'https://live.staticflickr.com/65535/52723752377_4c4428f711_k.jpg'
    },
    {
      h1: 'StarLink Satellites',
      p: "Discover SpaceX's Starlink project—an ambitious satellite constellation aiming to deliver high-speed internet across the globe, especially to remote and underserved areas. Learn how thousands of low Earth orbit satellites work together to bring reliable connectivity to every corner of the planet.",
      button: 'StarLink',
      url: '/starlink',
      image: 'https://live.staticflickr.com/65535/51492841327_7da110faae_k.jpg'
    }
  ]


  return (
    <main className={classes.main}>
      {
        Section_Items.map((item, index) => (
          <section key={index+1}>
            <div className={classes.content}>
              <div
                className={classes.background_Image_Banner}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className={classes.details}>
                  <h1>{item.h1}</h1>
                  <p>
                    {item.p}
                  </p>
                  <Button
                    component={Link}
                    to={item.url}
                    variant="outline"
                    size="lg"
                    radius="md"
                    color="white"
                    className={classes.bannerButton}
                  >
                    {item.button}
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))
      }
    </main>
  )
}

export default Home;
