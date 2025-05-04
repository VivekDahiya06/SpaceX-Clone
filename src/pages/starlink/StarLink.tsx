import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query'
import classes from './StarLink.module.scss'


const Fetch_StarLink = async () => {
  const response = await fetch('https://api.spacexdata.com/v4/starlink');
  return response.json();
}

const StarLink = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['starlink'],
    queryFn: Fetch_StarLink
  }
  )

  console.log(data)

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
    <main className={classes.main}>
      This is StarLink Page
    </main>
  )
}

export default StarLink
