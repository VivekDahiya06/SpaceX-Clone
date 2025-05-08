import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Rockets_API } from '../../api/Rocket.ts';
import classes from './Rockets.module.scss';
import { Rocket_Details_Type } from '../../Types/Rocket.types';
import { useRocketStore } from '../../store/Rocket.store';
import React from 'react';

const Rocket_Card = React.lazy(() => import('../../components/card/rocket_card/Rocket_Card_Component'));
const Rocket_Modal = React.lazy(() => import('../../components/modal/rocket_Modal/Rocket_Modal_Component'));

const Rockets = () => {

  
  // States
  const modalIndex = useRocketStore(state => state.modalIndex);
  const { data, isLoading, error } = useQuery({
    queryKey: ['rockets'],
    queryFn: Rockets_API.get_All_Rockets,
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
      {/* <div className={classes.filter}>
        Filter
      </div> */}
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
