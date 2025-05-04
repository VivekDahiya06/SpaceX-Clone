import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Launches.module.scss';
import { Launches_API } from '../../api/Launch';
import Launch_Card from '../../components/card/launch_card/Launch_Card_Component';
import { Launch_Details_Type } from '../../Types/Launch.types';

const Launches = () => {
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
          .map((launch: Launch_Details_Type, index: number) => (
            <Launch_Card key={index} Launch={launch} />
          ))}
      </div>
    </main>
  );
};

export default Launches;
