import { FC, useState } from "react";
import { StarLink_Details_Type } from "../../../Types/StarLink.types";
import { Button, Card, Image, Text, Transition } from "@mantine/core";
import classes from './StarLink_Card.module.scss';
import satellite from '/images/satellite_background.png';

interface Props {
StarLink: StarLink_Details_Type
}
const StarLink_Card: FC<Props> = ({ StarLink }) => {
  
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <Card
      shadow="xl"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 400,
        height: 450,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* Card Section to show Image or Carousel */}
      <Card.Section>
        <Image
          src={satellite}
          opacity={0.2}
          height={450}
          alt={"Satellite"}
          fit='cover'
          className={classes.image}
          style={{ transform: hovered ? 'scale(1)' : 'scale(1.15)' }}
        />
      </Card.Section>
        
          <div
            className={classes.details}
            style={{
              zIndex: 1,
              padding: '1em',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#0000009a',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <div className={classes.content}>
              <div className={classes.info}>
                <Text>
                  <code>ID:</code> <span>{StarLink.spaceTrack.OBJECT_ID}</span>
                </Text>
                <Text>
                  <code>Name:</code> <span>{StarLink.spaceTrack.OBJECT_NAME}</span>
                </Text>
                <Text>
                  <code>Latitude:</code> <span>{StarLink.latitude.toFixed(3)}</span>
                </Text>
                <Text>
                  <code>Longitude:</code> <span>{StarLink.longitude.toFixed(3)}</span>
                </Text>
                {/* <Text>
                  <code>Active:</code>{" "}
                  <Badge color={StarLink.active ? "green" : "red"}>
                    {StarLink.active ? "Yes" : "No"}
                  </Badge>
                </Text> */}
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <Button size="xs" variant="white">
                  Show More
                </Button>
                {/* <ActionIcon
                  bg={"#e8e8e8dd"}
                  radius="xl"
                  component={Link}
                  to={StarLink.wikipedia}
                  size={30}
                >
                  <BsWikipedia size={15} color={"#000"} />
                </ActionIcon> */}
              </div>
            </div>
          </div>
    </Card>
  )
}

export default StarLink_Card;
