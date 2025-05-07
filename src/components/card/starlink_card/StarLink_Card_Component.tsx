import { FC, useState } from "react";
import { StarLink_Details_Type } from "../../../Types/StarLink.types";
import { Button, Card, Text } from "@mantine/core";
import classes from './StarLink_Card.module.scss';
import satellite_background from '/images/satellite_background.png';
import { useStarLinkStore } from "../../../store/StarLink.store";

interface Props {
  StarLink: StarLink_Details_Type;
  index: number;
}

const StarLink_Card: FC<Props> = ({ StarLink, index }) => {

  // States
  const setModalIndex = useStarLinkStore(state => state.setModalIndex);
  const toggleModal = useStarLinkStore(state => state.toggleModal);
  const [hovered, setHovered] = useState<boolean>(false);


  // Functions
  const handle_Details = (index: number) => {
    setModalIndex(index);
    toggleModal();
  }


  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Card Section to show Image or Carousel */}
      <Card.Section>
        <img
          src={satellite_background}
          alt={StarLink.spaceTrack.OBJECT_NAME}
          loading='lazy'
          className={classes.image}
          style={{ transform: hovered ? 'scale(1)' : 'scale(1.15)' }}
        />
      </Card.Section>

      <div
        className={classes.details}>
        <div className={classes.content}>
          <div className={classes.info}>
            <Text><code>Satellite ID:</code> <span>{StarLink.spaceTrack.OBJECT_ID}</span></Text>
            <Text><code>Satellite Name:</code> <span>{StarLink.spaceTrack.OBJECT_NAME}</span></Text>
            <Text><code>Latitude:</code> <span>{StarLink.latitude.toFixed(3)}</span></Text>
            <Text><code>Longitude:</code> <span>{StarLink.longitude.toFixed(3)}</span></Text>
          </div>

          <div className={classes.buttons}>
            <Button size="xs" variant="white" onClick={() => handle_Details(index)}>
              Show More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default StarLink_Card;
