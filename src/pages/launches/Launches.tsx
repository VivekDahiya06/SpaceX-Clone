import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Launches.module.scss';
import { Launches_API } from '../../api/Launch';
import Launch_Card from '../../components/card/launch_card/Launch_Card_Component';
import { Launch_Details_Type } from '../../Types/Launch.types';
import React from 'react';
import Launch_Modal from '../../components/modal/launch_modal/Launch_Modal_Component';
import { useLaunchStore } from '../../store/Launch.store';

const Launches = () => {

  const modalIndex = useLaunchStore(state => state.modalIndex);
  const { data, isLoading, error } = useQuery({
    queryKey: ['launches'],
    queryFn: Launches_API.get_All_Launches,
  });

  // console.log(data);

  if (isLoading) {
    return (
      <main className={classes.loader}>
        <Loader color="#848eff" size="xl" />
      </main>
    );
  }

  if (error) {
    return <div>Error loading launches.</div>;
  }

  return (
    <main className={classes.main}>
      <div className={classes.filter}>This is filter</div>
      <div className={classes.cards}>
        {data
          ?.filter(
            (launch: Launch_Details_Type) =>
              launch.links.flickr.original.length > 0 ||
              launch.links.flickr.small.length > 0
          )
          .map((Launch: Launch_Details_Type, index: number) => (
            <React.Fragment key={index}>
              <Launch_Card Launch={Launch} index={index} />
              {
                modalIndex === index && (
                  <Launch_Modal Launch={Launch} />
                )
              }
            </React.Fragment>
          ))}
      </div>
    </main>
  );
};

export default Launches;
