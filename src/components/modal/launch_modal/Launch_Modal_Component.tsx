// Import Statements
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Launch_Details_Type } from '../../../Types/Launch.types';
import { useLaunchStore } from '../../../store/Launch.store';
import { BsWikipedia, BsYoutube } from 'react-icons/bs';
import { ActionIcon, Badge, Modal, Text } from '@mantine/core';
import classes from './Launch_Modal.module.scss';

// Props Definition
interface Props {
    Launch: Launch_Details_Type;
}

const Launch_Modal: FC<Props> = ({ Launch }) => {

    // States & Hooks
    const showModal = useLaunchStore(state => state.showModal);
    const toggleModal = useLaunchStore(state => state.toggleModal);

    return (
        <Modal opened={showModal} onClose={toggleModal} z-index={11} size={'lg'} title={<Text fw={900} size="xl">{Launch.name}</Text>}>
            <section className={classes.modal}>
                <div>
                    <img
                        src={Launch.links.flickr.original[0]}
                        alt={Launch.name}
                        className={classes.modalImage}
                        loading='lazy'
                    />
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalDetails}>
                        { Launch.details && <Text><code>Details: </code>{Launch.details}</Text> }
                        <Text><code>Flight Number: </code><mark>{Launch.flight_number}</mark></Text>
                        <Text><code>Upcoming: </code>
                            <Badge color={Launch.upcoming ? "green" : "red"}>{Launch.upcoming ? "Yes" : "No"}</Badge>
                        </Text>
                        <Text><code>Launch Date(UTC):</code> <mark>{new Date(Launch.date_utc).toUTCString()}</mark></Text>
                        <Text><code>Launch Date(Local):</code> <mark>{new Date(Launch.date_local).toLocaleString()}</mark></Text>
                        <Text><code>Static Fire Date(UTC):</code> <mark>{new Date(Launch.static_fire_date_utc).toUTCString()}</mark></Text>
                        <Text><code>Launch Date Precision:</code> <mark>{Launch.date_precision}</mark></Text>
                        <Text><code>Launch Success: </code><mark>{Launch.success ? "Yes" : "No"}</mark></Text>
                        <Text><code>Failures: </code><mark>{Launch.failures.length}</mark></Text>
                        <Text><code>Crew Members: </code><mark>{Launch.crew.length}</mark></Text>

                        {/* Cores */}
                        <Text fw={800} mt="xl" size="lg">Core Stage</Text>
                        <Text><code>No. of Cores: </code><mark>{Launch.cores.length}</mark></Text>
                        <Text><code>Grid Fins: </code><mark>{Launch.cores[0].gridfins ? 'Yes' : 'No'}</mark></Text>
                        <Text><code>Legs: </code><mark>{Launch.cores[0].legs ? 'Yes' : 'No'}</mark></Text>
                        <Text><code>Flight Count: </code><mark>{Launch.cores[0].flight}</mark></Text>
                        <Text><code>Reused: </code><mark>{Launch.cores[0].reused ? 'Yes' : 'No'}</mark></Text>
                        <Text><code>Landing Attempt: </code><mark>{Launch.cores[0].landing_attempt ? 'Yes' : 'No'}</mark></Text>
                        <Text><code>Landing Success: </code><mark>{Launch.cores[0].landing_success ? 'Yes' : 'No'}</mark></Text>
                        {Launch.cores[0].landing_type && <Text><code>Landing Type: </code><mark>{Launch.cores[0].landing_type}</mark></Text>}
                        
                        <div className={classes.externalLinks}>
                            <ActionIcon
                                radius="xl"
                                component={Link}
                                to={Launch.links.wikipedia}
                                size={50}
                                style={{ background: "#000000dd" }}
                            >
                                <BsWikipedia size={30} color={"#ffffff"} />
                            </ActionIcon>
                            <ActionIcon
                                radius="xl"
                                component={Link}
                                to={Launch.links.webcast}
                                size={50}
                                style={{ background: "#000000dd" }}
                            >
                                <BsYoutube size={30} color={"#ffffff"} />
                            </ActionIcon>
                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    )
}

export default Launch_Modal;
