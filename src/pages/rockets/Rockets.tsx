import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Rockets_API } from '../../API/Rocket';
import classes from './Rockets.module.scss';
import Rocket_Card from '../../components/card/rocket_card/Rocket_Card_Component';


const Rockets = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['rockets'],
    queryFn: Rockets_API.get_All_Rockets
  }
  )

  console.log(data)

  if (isLoading) {
    return (
      <main className={classes.loader}>
        < Loader color='#848eff' size={'xl'} />
      </main>
    )
  }

  if (error) {
    return <div>Error: </div>
  }


  return (
    <main className={classes.main}>
      <div className={classes.filter}>
        This is filter
      </div>
      <div className={classes.cards}>
        {data.map((Rocket: Rocket_Details_Type, index: number) => (
          <Rocket_Card key={index} Rocket={Rocket} />
        ))}
      </div>
    </main>
  )
}

export default Rockets
