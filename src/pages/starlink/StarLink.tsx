import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query'
import React from 'react';


const Fetch_StarLink = async () => {
  const response = await fetch('https://api.spacexdata.com/v4/starlink');
  return response.json();
}

const StarLink = () => {

  const { data, isLoading, error } = useQuery({
        queryKey: ['starlink'],
        queryFn: Fetch_StarLink
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
      This is StarLink Page
    </div>
  )
}

export default StarLink
