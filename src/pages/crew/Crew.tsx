import axios from 'axios';
import { ActionIcon, Button, Loader, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Crew.module.scss';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Crew_Details_Type } from '../../Types/Crew.types.ts';
import { RiFilterFill, RiFilterLine } from "react-icons/ri";
const Crew_Card = React.lazy(() => import('../../components/card/crew_card/Crew_Card_Component'));

const get_All_Crew = async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/crew');
  return response.data;
}

const Crew = () => {

  // Constants
  const itemsPerPage = 12;


  // States
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState({
    open: false,
    type: '',
    value: ''
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ['crew'],
    queryFn: get_All_Crew,
    keepPreviousData: true
  });

  useEffect(() => {
    console.log('filter', filter);
  },[filter])


  // Functions
  const filteredData = useMemo(() => {
    if (!data) return [];
    const value = filter.value.trim().toLowerCase();
    return data.filter((crew: Crew_Details_Type) => {
      if (filter.type === 'Name') {
        return crew.name?.toLowerCase().includes(value);
      }
      else {
        return crew.agency?.toLowerCase().includes(value);
      }
    }

    );
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
    return <div>Error loading crew data.</div>;
  }

  return (
    <Suspense fallback={
      <main className={classes.loader}>
        <Loader color="#848eff" size="xl" />
      </main>
    }>
      <main className={classes.main}>
        <div className={classes.filterContainer}>
          <div className={classes.filter}>
            <div className={classes.filterButtons}>
              <ActionIcon onClick={() => setFilter({ ...filter, open: !filter.open, type: '' })}>
              { filter.open ? <RiFilterFill size={30} color='black' /> : <RiFilterLine size={30} color='black' /> }
              </ActionIcon>
              {
                filter.open && (
                  <Button.Group style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Button variant='outline' style={{backgroundColor: filter.type === 'Name' ? 'black' : 'white', color: filter.type === 'Name' ? 'white' : 'black'}} onClick={() => setFilter({ ...filter, type: 'Name' })}>Name</Button>
                    <Button variant='outline' style={{backgroundColor: filter.type === 'Agency' ? 'black' : 'white', color: filter.type === 'Agency' ? 'white' : 'black'}} onClick={() => setFilter({ ...filter, type: 'Agency' })}>Agency</Button>
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
                    setFilter({ ...filter, value: e.target.value});
                  }}
                />
              </div>
            )
          }
        </div>
        <div className={classes.cards}>
          {paginatedData.map((Crew: Crew_Details_Type, index: number) => (
            <Crew_Card key={index} Crew={Crew} />
          ))}
        </div>
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
    </Suspense>
  );
};

export default Crew;
