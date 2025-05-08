import { Loader, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Crew.module.scss';
// import Crew_API from '../../api/Crew.ts';
import React, { Suspense, useMemo, useState } from 'react';
import { Crew_Details_Type } from '../../Types/Crew.types.ts';
// import { api } from '../../api/Axios.ts';
import axios from 'axios';

const Crew_Card = React.lazy(() => import('../../components/card/crew_card/Crew_Card_Component'));

const get_All_Crew = async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/crew');
  return response.data;
}

const Crew = () => {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ['crew'],
    queryFn: get_All_Crew,
    keepPreviousData: true
  });

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, page]);

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.length / itemsPerPage) : 1;
  }, [data]);

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
        {/* <div className={classes.filter}>This is filter</div> */}
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
