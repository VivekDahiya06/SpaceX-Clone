import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query'
import classes from './StarLink.module.scss'
import { useCounterStore } from '../../store/app.store';


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

  const {count,increment,decrement} = useCounterStore((state) => state);
  


  return (
    <main className={classes.main}>
      This is StarLink Page
      <div className={classes.counter}>
        <h1>{count}</h1>
        <div className={classes.buttons}>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
        </div>
      </div>
    </main>
  )
}

export default StarLink
