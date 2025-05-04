import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';


const Fetch_Launches = async () => {
  const response = await fetch('https://api.spacexdata.com/v5/launches');
  return response.json();
}

const Launches = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['launches'],
    queryFn: Fetch_Launches
  }
  )

  console.log(data)

  if (isLoading) {
    return <Loader color='#848eff' size={'xl'} />
  }

  if (error) {
    return <div>Error: </div>
  }


  return (
    <div>
      This is Launches Page
    </div>
  )
}

export default Launches
