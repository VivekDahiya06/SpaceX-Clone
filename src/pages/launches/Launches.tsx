// Import Statements
import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Launch_Details_Type } from '../../Types/Launch.types.ts';
import { useLaunchStore } from '../../store/Launch.store.ts';
import { RiFilterFill, RiFilterLine } from 'react-icons/ri';
import { ActionIcon, Button, Loader, Pagination } from '@mantine/core';
import classes from './Launches.module.scss';
const Launch_Card = React.lazy(() => import('../../components/card/launch_card/Launch_Card_Component'));
const Launch_Modal = React.lazy(() => import('../../components/modal/launch_modal/Launch_Modal_Component'));


const Launches = () => {

  // Function to Fetch data from API
  const get_All_Launches = async () => {
    const response = await axios.get('https://api.spacexdata.com/v5/launches');
    return response.data;
  }


  // Constants
  const itemsPerPage = 12;


  // States & Hooks
  const modalIndex = useLaunchStore(state => state.modalIndex);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({
    open: false,
    type: '',
    value: ''
  });
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
  const filteredData = useMemo(() => {
    if (!data) return [];
    const value = filter.value.trim().toLowerCase();

    return data.filter((launch: Launch_Details_Type) => {
      if (filter.type === 'Name') {
        return launch.name?.toLowerCase().includes(value);
      }
      else if (filter.type === 'Upcoming') {
        if (value === 'yes') return launch.upcoming === true;
        if (value === 'no') return launch.upcoming === false;
        return true;
      }
      else if (filter.type === 'Date') {
        if (value === 'asc') return new Date(launch.date_utc).getTime() < new Date(launch.date_local).getTime();
        if (value === 'desc') return new Date(launch.date_utc).getTime() > new Date(launch.date_local).getTime();
        return true;
      }
      else {
        return launch.flight_number?.toString().includes(value);
      }
    });
  }, [data, filter]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, page]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData]);


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
      <div className={classes.filterContainer}>
        <div className={classes.filter}>
          <div className={classes.filterButtons}>
            <ActionIcon onClick={() => setFilter({ ...filter, open: !filter.open, type: '', value: '' })}>
              {filter.open ? <RiFilterFill size={30} color='black' /> : <RiFilterLine size={30} color='black' />}
            </ActionIcon>
            {
              filter.open && (
                <Button.Group style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <Button
                    variant='outline'
                    style={{
                      backgroundColor: filter.type === 'Name' ? 'black' : 'white',
                      color: filter.type === 'Name' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'Name' })}>
                    Name
                  </Button>
                  <Button
                    variant='outline'
                    style={{
                      backgroundColor: filter.type === 'Flight Number' ? 'black' : 'white',
                      color: filter.type === 'Flight Number' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'Flight Number' })}>
                    Flight Number
                  </Button>
                  <Button
                    variant='outline'
                    style={{
                      backgroundColor: filter.type === 'Upcoming' ? 'black' : 'white',
                      color: filter.type === 'Upcoming' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'Upcoming' })}>
                    Upcoming
                  </Button>
                  <Button
                    variant='outline'
                    style={{
                      backgroundColor: filter.type === 'Date' ? 'black' : 'white',
                      color: filter.type === 'Date' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'Date' })}>
                    Date
                  </Button>
                </Button.Group>
              )
            }

          </div>
        </div>
        {
          filter.type && (
            <div className={classes.filterInputContainer}>
              <input
                type="text"
                placeholder={`Search by ${filter.type}`}
                value={filter.value}
                onChange={(e) => {
                  setPage(1);
                  setFilter({ ...filter, value: e.target.value });
                }}
              />
            </div>
          )
        }
      </div>
      <div className={classes.cards}>
        {
          paginatedData.map((Launch: Launch_Details_Type, index: number) => {
            const globalIndex = (page - 1) * itemsPerPage + index;
            return (
              <React.Fragment key={globalIndex}>
                <Launch_Card Launch={Launch} index={globalIndex} />
                {modalIndex === globalIndex && <Launch_Modal Launch={Launch} />}
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
