import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './About.module.scss'


const Fetch_Company_Info = async () => {
  const response = await fetch('https://api.spacexdata.com/v4/company');
  return response.json();
}

const About = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['about'],
    queryFn: Fetch_Company_Info
  }
  )

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader color='#848eff' size={'xl'} />
      </div>
    )
  }

  if (error) {
    return <div>Error: </div>
  }


  return (
    <div>
      This is About Page
    </div>
  )
}

export default About
