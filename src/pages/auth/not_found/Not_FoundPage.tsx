import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import image from '/images/404.webp';
import classes from './Not_Found.module.scss';
import { Link } from 'react-router-dom';

const Not_Found = () => {
  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={40}
        cols={1}
        breakpoints={[{ minWidth: 'sm', cols: 2, spacing: 80 }]}
      >
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Link to="/">
            <Button variant="outline" size="md" mt="xl" className={classes.control}>
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}

export default Not_Found;