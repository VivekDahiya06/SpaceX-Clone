import { ActionIcon, Loader, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './About.module.scss';
// import About_API from '../../api/About.ts';
import { About_Details_Type } from '../../Types/About.types.ts';
import { BsTwitterX } from "react-icons/bs";
import { api } from '../../api/Axios.ts';


const get_About_Company = async () => {
  const response = await api.get('/v4/company');
  return response.data;
}

const About = () => {


  const { data, isLoading, error } = useQuery({
    queryKey: ['about'],
    queryFn: get_About_Company,
    select: (data: About_Details_Type) => data,
  });

  if (isLoading) {
    return (
      <main className={classes.loader}>
        <Loader color="#848eff" size="xl" />
      </main>
    );
  }

  if (error) {
    return <div>Error loading About data.</div>;
  }

  return (
    <main className={classes.main}>
      <section className={classes.section}>
        <div className={classes.imageContainer}>
          <img
            src="https://live.staticflickr.com/65535/52822653443_14ac1655d0_z.jpg"
            alt="SpaceX Rocket"
            className={classes.image}
            loading="lazy"
          />
        </div>

        <div className={classes.content}>
          <Title order={2} mb="md">Company Overview</Title>
          <Text><strong>Name:</strong> {data?.name}</Text>
          <Text><strong>Founder:</strong> {data?.founder}</Text>
          <Text><strong>Founded:</strong> {data?.founded}</Text>
          <Text><strong>CEO & CTO:</strong> {data?.ceo}</Text>
          <Text><strong>COO:</strong> {data?.coo}</Text>
          <Text><strong>Employees:</strong> {data?.employees}</Text>
          <Text><strong>Valuation:</strong> ${data?.valuation?.toLocaleString()}</Text>
          <Text><strong>Vehicles:</strong> {data?.vehicles}</Text>
          <Text><strong>Launch Sites:</strong> {data?.launch_sites}</Text>
          <Text><strong>Test Sites:</strong> {data?.test_sites}</Text>
          <Text><strong>Headquarters:</strong> {data?.headquarters?.address}, {data?.headquarters?.city}, {data?.headquarters?.state}</Text>
          <Text mt="md"><strong>Summary:</strong> {data?.summary}</Text>
          <div className={classes.externalLinks}>
            <ActionIcon
              component='a'
              href={data?.links?.twitter}
              target="_blank"
              rel="noopener noreferrer"
              radius="xl"
              size={50}
              style={{ background: '#000000' }}
            >
              <BsTwitterX color='#ffffff' size={25} />
            </ActionIcon>
              <Text
              component='a'
              href={data?.links?.website}
              target="_blank"
              rel="noopener noreferrer">
              For More Details Visit <mark>SPACEX</mark>
            </Text>
          </div>
        </div>


      </section>
    </main>
  );
};

export default About;
