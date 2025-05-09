// Import Statements
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crew_Details_Type } from '../../../Types/Crew.types';
import { BsWikipedia } from "react-icons/bs";
import { ActionIcon, Badge, Card, Text, Transition } from '@mantine/core';
import classes from './Crew_Card.module.scss';

// Props Definition
interface Props {
    Crew: Crew_Details_Type;
}

const Crew_Card: FC<Props> = ({ Crew }) => {

    // States & Hooks
    const [hovered, setHovered] = useState<boolean>(false);


    return (
        <Card
            shadow="xl"
            padding="lg"
            radius="md"
            withBorder
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            style={{ width: 400, height: 450, display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}
        >
            <Card.Section>
                <img
                    src={Crew.image}
                    alt={Crew.name}
                    loading='lazy'
                    className={classes.image}
                    style={hovered ? { transform: 'scale(1)' } : { transform: 'scale(1.15)' }}
                />
            </Card.Section>
            <Transition
                mounted={hovered}
                transition="fade"
                duration={350}
                timingFunction="ease"
            >
                {(TransitionStyles) => (
                    <div
                        className={classes.content}
                        style={{ ...TransitionStyles, zIndex: 1, padding: '1em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#0000009a', width: '100%', height: '100%' }}>
                        <div className={classes.details}>
                            <Text><code>Name:</code> <span>{Crew.name}</span></Text>
                            <Text><code>Agency:</code> <span>{Crew.agency}</span></Text>
                            <Text><code>Status:</code> <Badge color={Crew.status === 'active' ? 'green' : 'red'}>{Crew.status}</Badge></Text>
                            <Text><code>Launches:</code> <span>{Crew.launches.length}</span></Text>
                            <div className={classes.buttons}>
                                <ActionIcon bg={'#fff'} radius={'xl'} size={30} component={Link} to={Crew.wikipedia} target='_blank' rel='noopener noreferrer'>
                                    <BsWikipedia size={15} color='#000' />
                                </ActionIcon>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </Card>
    );
};

export default Crew_Card;
