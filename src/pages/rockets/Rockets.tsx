import React from 'react';
import axios from 'axios';
import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Rockets.module.scss';
import { Rocket_Details_Type } from '../../Types/Rocket.types.ts';
import { useRocketStore } from '../../store/Rocket.store.ts';
const Rocket_Card = React.lazy(() => import('../../components/card/rocket_card/Rocket_Card_Component'));
const Rocket_Modal = React.lazy(() => import('../../components/modal/rocket_Modal/Rocket_Modal_Component'));


const get_All_Rockets = async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/rockets');
  return response.data;
}


const Rockets = () => {

  
  // States
  const modalIndex = useRocketStore(state => state.modalIndex);
  const { data, isLoading, error } = useQuery({
    queryKey: ['rockets'],
    queryFn: get_All_Rockets,
  })


  // JSX Render Components
  if (isLoading) {
    return (
      <main className={classes.loader}>
        <Loader color='#848eff' size={'xl'} />
      </main>
    )
  }

  if (error) {
    return <div>Error loading Rockets data.</div>
  }

  return (
    <main className={classes.main}>
      <div className={classes.cards}>
        {
          data.map((Rocket: Rocket_Details_Type, index: number) => (
            <React.Fragment key={index}>
              <Rocket_Card Rocket={Rocket} index={index} />
              {
                modalIndex === index && (
                  <Rocket_Modal Rocket={Rocket} />
                )
              }
            </React.Fragment>
          ))
        }
      </div>
    </main>
  )
}

export default Rockets;
