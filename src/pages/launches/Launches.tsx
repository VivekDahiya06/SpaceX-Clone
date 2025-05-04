import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Launches.module.scss'



const Fetch_Launches = async () => {
  const response = await fetch('https://api.spacexdata.com/v5/launches');
  return response.json();
}

const Launches = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['launches'],
    queryFn: Fetch_Launches
  }
  )

  console.log(data)

  if (isLoading) {
    return (
      <main className={classes.loader}>
        <Loader color='#848eff' size={'xl'} />
      </main>
    )
  }

  if (error) {
    return <div>Error: </div>
  }


  return (
    <main className={classes.main}>
      This is Launches Page
    </main>
  )
}

export default Launches
