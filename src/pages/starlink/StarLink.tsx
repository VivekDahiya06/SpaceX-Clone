// Import Statements
import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { StarLink_Details_Type } from '../../Types/StarLink.types.ts';
import { useStarLinkStore } from '../../store/StarLink.store.ts';
import { RiFilterFill, RiFilterLine } from 'react-icons/ri';
import { ActionIcon, Button, Loader, Pagination } from '@mantine/core';
import classes from './StarLink.module.scss';
const StarLink_Card = React.lazy(() => import('../../components/card/starlink_card/StarLink_Card_Component'));
const StarLink_Modal = React.lazy(() => import('../../components/modal/starlink_modal/StarLink_Modal_Component'));


const StarLink = () => {

  // Function to Fetch data from API
  const get_All_StarLink = async () => {
    const response = await axios.get('https://api.spacexdata.com/v4/starlink');
    return response.data;
  }


  // Constants
  const itemsPerPage = 12;


  // States & Hooks
  const modalIndex = useStarLinkStore(state => state.modalIndex);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({
    open: false,
    type: '',
    value: ''
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ['starlink'],
    queryFn: get_All_StarLink,
    select: (data) =>
      data.filter(
        (starLink: StarLink_Details_Type) =>
          starLink.latitude !== null && starLink.longitude !== null
      ),
    keepPreviousData: true
  });


  // Functions
  const filteredData = useMemo(() => {
    if (!data) return [];
    const value = filter.value.trim().toLowerCase();

    return data.filter((starlink: StarLink_Details_Type) => {
      if (filter.type === 'Name') {
        return starlink.spaceTrack.OBJECT_NAME?.toLowerCase().includes(value);
      }
      else if (filter.type === 'Longitude') {
        return starlink.longitude?.toString().includes(value);
      }
      else if (filter.type === 'Latitude') {
        return starlink.latitude?.toString().includes(value);
      }
      else {
        return starlink.spaceTrack.OBJECT_ID?.toString().includes(value);
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
    return <div>Error loading StarLink data.</div>;
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
                      backgroundColor: filter.type === 'ID' ? 'black' : 'white',
                      color: filter.type === 'ID' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'ID' })}>
                    ID
                  </Button>
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
                      backgroundColor: filter.type === 'Longitude' ? 'black' : 'white',
                      color: filter.type === 'Longitude' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'Longitude' })}>
                    Longitude
                  </Button>
                  <Button
                    variant='outline'
                    style={{
                      backgroundColor: filter.type === 'Latitude' ? 'black' : 'white',
                      color: filter.type === 'Latitude' ? 'white' : 'black'
                    }}
                    onClick={() => setFilter({ ...filter, type: 'Latitude' })}>
                    Latitude
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
          paginatedData.map((StarLink: StarLink_Details_Type, index: number) => {
            const globalIndex = (page - 1) * itemsPerPage + index;
            return (
              <React.Fragment key={globalIndex}>
                <StarLink_Card StarLink={StarLink} index={globalIndex} />
                {
                  modalIndex === globalIndex && (
                    <StarLink_Modal StarLink={StarLink} />
                  )
                }
              </React.Fragment>
            );
          })
        }
      </div>

      {/* Pagination Component */}
      <Pagination
        total={totalPages}
        value={page}
        onChange={setPage}
        mt="xl"
        color="black"
        size="md"
        radius="md"
      />
    </main>
  );
};

export default StarLink;
