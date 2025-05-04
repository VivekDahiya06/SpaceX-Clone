import { Loader, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './Crew.module.scss';
import { Crew_API } from '../../api/Crew';
import Card_Component from '../../components/card/crew_card/Crew_Card_Component';
import { useState } from 'react';
import { Crew_Details_Type } from '../../Types/Crew.types';

const Crew = () => {

  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ['crew', page],
    queryFn: Crew_API.get_All_Crew,
    select: (data) => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return data.slice(start, end);
    },
    keepPreviousData: true,
  });

  const totalItems = 30;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) {
    return (
      <main className={classes.loader}>
        <Loader color="#848eff" size="xl" />
      </main>
    )
  }

  if (error) {
    return <div>Error loading crew data.</div>;
  }

  return (
    <main className={classes.main}>
      <div className={classes.filter}>
        This is filter
      </div>
      <div className={classes.cards}>
        {data.map((Crew_Data: Crew_Details_Type, index: number) => (
          <Card_Component key={index} Crew={Crew_Data} />
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
  );
};

export default Crew;
