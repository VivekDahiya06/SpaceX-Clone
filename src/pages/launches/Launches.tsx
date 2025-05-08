import { Loader, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Launches.module.scss';
// import Launches_API from '../../api/Launch.ts';
import { Launch_Details_Type } from '../../Types/Launch.types.ts';
import React, { useMemo, useState } from 'react';
import { useLaunchStore } from '../../store/Launch.store.ts';
import axios from 'axios';
// import { api } from '../../api/Axios.ts';

// Lazy Components
const Launch_Card = React.lazy(() => import('../../components/card/launch_card/Launch_Card_Component'));
const Launch_Modal = React.lazy(() => import('../../components/modal/launch_modal/Launch_Modal_Component'));

const get_All_Launches = async () => {
  const response = await axios.get('https://api.spacexdata.com/v5/launches');
  return response.data;
}

const Launches = () => {

  // Constants
  const itemsPerPage = 12;


  // States
  const modalIndex = useLaunchStore(state => state.modalIndex);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ['launches'],
    queryFn: get_All_Launches,
    select: (data) =>
      data.filter(
        (launch: Launch_Details_Type) =>
          launch.links.flickr.original.length > 0 ||
          launch.links.flickr.small.length > 0
      ),
    keepPreviousData: true
  });


  // Functions
  const paginatedData = useMemo(() => {
    if (!data) return [];
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, page]);

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / itemsPerPage) : 1;
  }, [data]);


  // JSX Render Components
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
      {/* <div className={classes.filter}>This is filter</div> */}
      <div className={classes.cards}>
        {
          paginatedData.map((Launch: Launch_Details_Type, index: number) => {
          const globalIndex = (page - 1) * itemsPerPage + index;
          return (
            <React.Fragment key={globalIndex}>
              <Launch_Card Launch={Launch} index={globalIndex} />
              { modalIndex === globalIndex && <Launch_Modal Launch={Launch} /> }
            </React.Fragment>
          );
          })
        }
      </div>

      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        mt="xl"
        color="black"
        size={'md'}
        radius="md"
      />
    </main>
  );
};

export default Launches;
