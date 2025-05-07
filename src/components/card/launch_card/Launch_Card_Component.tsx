import { ActionIcon, Badge, Button, Card, Text, Transition } from "@mantine/core";
import React, { FC, useState } from "react";
import classes from './Launch_Card.module.scss';
import { Link } from "react-router-dom";
import { BsWikipedia, BsYoutube } from "react-icons/bs";
import { Launch_Details_Type } from "../../../Types/Launch.types";
import { useLaunchStore } from "../../../store/Launch.store";

interface Props {
  Launch: Launch_Details_Type;
  index: number
}

const Launch_Card: FC<Props> = ({ Launch, index }) => {

  // States
  const toggleModal = useLaunchStore(state => state.toggleModal);
  const setModalIndex = useLaunchStore(state => state.setModalIndex);
  const [hovered, setHovered] = useState<boolean>(false);


  // Functions
  const handle_Details = (index: number) => {
    setModalIndex(index);
    toggleModal();
  }


  return (
    <Card
      shadow="xl"
      padding="lg"
      radius="md"
      withBorder
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
        <img
          src={Launch.links.flickr.original[0] || Launch.links.flickr.small[0]}
          loading="lazy"
          alt={Launch.name}
          className={classes.image}
          style={{ transform: hovered ? 'scale(1)' : 'scale(1.15)' }}
        />
      </Card.Section>


      {/* Details showed in case of Hover */}
      <Transition
        mounted={hovered}
        transition="fade"
        duration={400}
        timingFunction="ease-in-out"
      >
        {(TransitionStyles) => (
          <div
            className={classes.details}
            style={{
              ...TransitionStyles,
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
              alignItems: 'end',
            }}>
            <div className={classes.content}>
              <div className={classes.info}>
                <Text>
                  <code>Name:</code> <mark>{Launch.name}</mark>
                </Text>
                <Text>
                  <code>Date(UTC):</code> <mark>{new Date(Launch.date_utc).toUTCString()}</mark>
                </Text>
                <Text>
                  <code>Upcoming:</code>{" "}
                  <Badge color={Launch.upcoming ? "green" : "red"}>
                    {Launch.upcoming ? "Yes" : "No"}
                  </Badge>
                </Text>
              </div>

              <div className={classes.buttons}>
                <Button size="xs" variant="white" onClick={() => handle_Details(index)}>
                  Show More
                </Button>
                <div className={classes.externalLinks}>
                  <ActionIcon
                    bg={"#e8e8e8dd"}
                    radius="xl"
                    component={Link}
                    to={Launch.links.wikipedia}
                    size={30}
                  >
                    <BsWikipedia size={15} color={"#000"} />
                  </ActionIcon>
                  <ActionIcon
                    bg={"#e8e8e8dd"}
                    radius="xl"
                    component={Link}
                    to={Launch.links.webcast}
                    size={30}
                  >
                    <BsYoutube size={15} color={"#000"} />
                  </ActionIcon>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Card>
  );
};

export default Launch_Card;
