import { Loader, Pagination } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './StarLink.module.scss';
import StarLink_API from '../../api/StarLink.ts';
import { StarLink_Details_Type } from '../../Types/StarLink.types.ts';
import { useStarLinkStore } from '../../store/StarLink.store.ts';
import React, { useMemo, useState } from 'react';
import { api } from '../../api/Axios.ts';

// Lazy Components
const StarLink_Card = React.lazy(() => import('../../components/card/starlink_card/StarLink_Card_Component'));
const StarLink_Modal = React.lazy(() => import('../../components/modal/starlink_modal/StarLink_Modal_Component'));


const get_All_StarLink = async () => {
  const response = await api.get('/v4/starlink');
  return response.data;
}

const StarLink = () => {

  // Constants
  const itemsPerPage = 12;


  // States
  const modalIndex = useStarLinkStore(state => state.modalIndex);
  const [page, setPage] = useState<number>(1);
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
    return <div>Error loading StarLink data.</div>;
  }

  return (
    <main className={classes.main}>
      {/* <div className={classes.filter}>This is filter</div> */}
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
