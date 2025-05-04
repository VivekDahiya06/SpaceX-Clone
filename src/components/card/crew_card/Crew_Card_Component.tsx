import { ActionIcon, Badge, Card, Image, Text, Transition } from '@mantine/core';
import { FC, useState } from 'react';
import { BsWikipedia } from "react-icons/bs";
import { Link } from 'react-router-dom';
import classes from './Crew_Card.module.scss';
import { Crew_Details_Type } from '../../../Types/Crew.types';

interface Props {
    Crew: Crew_Details_Type;
}

const Card_Component: FC<Props> = ({ Crew }) => {
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
            {/* Image section - 50% height */}
            <Card.Section style={{ height: '80%' }}>
                <Image
                    src={Crew.image}
                    height="100%"
                    alt="Crew"
                    fit="cover"
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
                        className={classes.details}
                        style={{ ...TransitionStyles, zIndex: 1, padding: '1em', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#0000009a', width: '100%', height: '100%' }}>
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'start', gap: '0.5em', color: '#fff' }}>
                            <Text><code>Name:</code> <mark>{Crew.name}</mark></Text>
                            <Text><code>Agency:</code> <mark>{Crew.agency}</mark></Text>
                            <Text><code>Status:</code> <Badge color={Crew.status === 'active' ? 'green' : 'red'}>{Crew.status}</Badge></Text>
                            <Text><code>Launches:</code> <mark>{Crew.launches.length}</mark></Text>
                            <div className={classes.buttons}>
                                <ActionIcon bg={'#fff'} radius={'xl'} size={30} component={Link} to={Crew.wikipedia}><BsWikipedia size={15} color='#000' /></ActionIcon>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </Card>
    );
};

export default Card_Component;
