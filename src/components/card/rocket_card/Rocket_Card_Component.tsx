// Import Statements
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Rocket_Details_Type } from "../../../Types/Rocket.types";
import { useRocketStore } from "../../../store/Rocket.store";
import { BsWikipedia } from "react-icons/bs";
import { ActionIcon, Badge, Button, Card, Text, Transition } from "@mantine/core";
import classes from "./Rocket_Card.module.scss";

// Props Definition
interface Props {
  Rocket: Rocket_Details_Type;
  index: number;
}

const Rocket_Card: FC<Props> = ({ Rocket, index }) => {

  // States & Hooks
  const toggleModal = useRocketStore(state => state.toggleModal);
  const setModalIndex = useRocketStore(state => state.setModalIndex);
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
          src={Rocket.flickr_images[0]}
          alt={Rocket.name}
          loading="lazy"
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
                  <code>Name:</code> <mark>{Rocket.name}</mark>
                </Text>
                <Text>
                  <code>Company:</code> <mark>{Rocket.company}</mark>
                </Text>
                <Text>
                  <code>Active:</code>{" "}
                  <Badge color={Rocket.active ? "green" : "red"}>
                    {Rocket.active ? "Yes" : "No"}
                  </Badge>
                </Text>
              </div>

              <div className={classes.buttons}>
                <Button size="xs" variant="white" onClick={() => handle_Details(index)}>
                  Show More
                </Button>
                <ActionIcon
                  bg={"#e8e8e8dd"}
                  radius="xl"
                  component={Link}
                  to={Rocket.wikipedia}
                  size={30}
                >
                  <BsWikipedia size={15} color={"#000"} />
                </ActionIcon>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Card>
  );
};

export default Rocket_Card;
