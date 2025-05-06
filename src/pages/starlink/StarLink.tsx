import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query'
import classes from './StarLink.module.scss'
import { StarLink_API } from '../../api/StarLink';
import { StarLink_Details_Type } from '../../Types/StarLink.types';
import StarLink_Card from '../../components/card/starlink_card/StarLink_Card_Component';



const StarLink = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['starlink'],
    queryFn: StarLink_API.get_All_StarLink,
    select: (data) => data.filter(
      (starLink: StarLink_Details_Type)=> starLink.latitude !== null && starLink.longitude !== null
    )
  }
  )

  console.log(data)

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Loader color='#848eff' size={'xl'} />
      </div>
    )
  }

  if (error) {
    return <div>Error: </div>
  }

    


  return (
    <main className={classes.main}>
      <div className={classes.filter}>
        This is filter
      </div>
      <div className={classes.cards}>
        {data.map((StarLink: StarLink_Details_Type, index: number) => (
          <StarLink_Card key={index} StarLink={StarLink} />
        ))}
      </div>
    </main>
  )
}

export default StarLink
