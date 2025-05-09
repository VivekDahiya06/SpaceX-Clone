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
                        {Launch.details && <Text><code>Details: </code>{Launch.details}</Text>}
                        <Text><code>Flight Number: </code><span>{Launch.flight_number}</span></Text>
                        <Text><code>Upcoming: </code>
                            <Badge color={Launch.upcoming ? "green" : "red"}>{Launch.upcoming ? "Yes" : "No"}</Badge>
                        </Text>
                        <Text><code>Launch Date(UTC):</code> <span>{new Date(Launch.date_utc).toUTCString()}</span></Text>
                        <Text><code>Launch Date(Local):</code> <span>{new Date(Launch.date_local).toLocaleString()}</span></Text>
                        <Text><code>Static Fire Date(UTC):</code> <span>{new Date(Launch.static_fire_date_utc).toUTCString()}</span></Text>
                        <Text><code>Launch Date Precision:</code> <span>{Launch.date_precision}</span></Text>
                        <Text><code>Launch Success: </code><span>{Launch.success ? "Yes" : "No"}</span></Text>
                        <Text><code>Failures: </code><span>{Launch.failures.length}</span></Text>
                        <Text><code>Crew Members: </code><span>{Launch.crew.length}</span></Text>

                        {/* Cores */}
                        <Text fw={800} mt="xl" size="lg">Core Stage</Text>
                        <Text><code>No. of Cores: </code><span>{Launch.cores.length}</span></Text>
                        <Text><code>Grid Fins: </code><span>{Launch.cores[0].gridfins ? 'Yes' : 'No'}</span></Text>
                        <Text><code>Legs: </code><span>{Launch.cores[0].legs ? 'Yes' : 'No'}</span></Text>
                        <Text><code>Flight Count: </code><span>{Launch.cores[0].flight}</span></Text>
                        <Text><code>Reused: </code><span>{Launch.cores[0].reused ? 'Yes' : 'No'}</span></Text>
                        <Text><code>Landing Attempt: </code><span>{Launch.cores[0].landing_attempt ? 'Yes' : 'No'}</span></Text>
                        <Text><code>Landing Success: </code><span>{Launch.cores[0].landing_success ? 'Yes' : 'No'}</span></Text>
                        {Launch.cores[0].landing_type && <Text><code>Landing Type: </code><span>{Launch.cores[0].landing_type}</span></Text>}

                        <div className={classes.externalLinks}>
                            <ActionIcon
                                radius="xl"
                                component={Link}
                                to={Launch.links.wikipedia}
                                target="_blank"
                                rel='noreferrer noopener'
                                size={50}
                                style={{ background: "#000000dd" }}
                            >
                                <BsWikipedia size={30} color={"#ffffff"} />
                            </ActionIcon>
                            <ActionIcon
                                radius="xl"
                                component={Link}
                                to={Launch.links.webcast}
                                target="_blank"
                                rel='noreferrer noopener'
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
