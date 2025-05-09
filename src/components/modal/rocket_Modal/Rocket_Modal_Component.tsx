// Import Statements
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket_Details_Type } from '../../../Types/Rocket.types';
import { useRocketStore } from '../../../store/Rocket.store';
import { BsWikipedia } from 'react-icons/bs';
import { ActionIcon, Badge, Modal, Switch, Text } from '@mantine/core';
import classes from './Rocket_Modal.module.scss';

// Props Definition
interface Props {
    Rocket: Rocket_Details_Type;
}

const Rocket_Modal: FC<Props> = ({ Rocket }) => {

    // States & Hooks
    const showModal = useRocketStore(state => state.showModal);
    const toggleModal = useRocketStore(state => state.toggleModal);
    const [metricSystem, useMetricSystem] = useState<boolean>(true);

    return (
        <Modal opened={showModal} onClose={toggleModal} z-index={11} size={'lg'} title={<Text fw={900} size="xl">{Rocket.name}</Text>}>
            <section className={classes.modal}>
                <div className={classes.modalSwitch}>
                    <Switch
                        size='xl'
                        checked={metricSystem}
                        onLabel="Metric"
                        offLabel="Imperial"
                        color="green"
                        onChange={(e) => { useMetricSystem(e.currentTarget.checked) }} />
                </div>
                <div>
                    <img
                        src={Rocket.flickr_images[0]}
                        alt={Rocket.name}
                        className={classes.modalImage}
                        loading='lazy'
                    />
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalDetails}>
                        <Text><code>Description: </code>{Rocket.description}</Text>
                        <Text><code>Company: </code><mark>{Rocket.company}</mark></Text>
                        <Text><code>Active: </code>
                            <Badge color={Rocket.active ? "green" : "red"}>{Rocket.active ? "Yes" : "No"}</Badge>
                        </Text>
                        <Text><code>Country: </code><mark>{Rocket.country}</mark></Text>
                        <Text><code>Type: </code><mark>{Rocket.type}</mark></Text>
                        <Text><code>Height: </code>
                            <mark>{metricSystem ? Rocket.height.meters + ' m' : Rocket.height.feet + ' ft'}</mark>
                        </Text>
                        <Text><code>Diameter: </code>
                            <mark>{metricSystem ? Rocket.diameter.meters + ' m' : Rocket.diameter.feet + ' ft'}</mark>
                        </Text>
                        <Text><code>Mass: </code>
                            <mark>{metricSystem ? (Rocket.mass.kg) / 1000 + ' t' : (Rocket.mass.lb) / 1000 + ' short ton'}</mark>
                        </Text>
                        <Text><code>Cost Per Launch: </code><mark>${Rocket.cost_per_launch.toLocaleString()} USD</mark></Text>
                        <Text><code>Success Rate: </code><mark>{Rocket.success_rate_pct + '%'}</mark></Text>
                        <Text><code>First Flight: </code><mark>{Rocket.first_flight}</mark></Text>
                        <Text><code>Stages: </code><mark>{Rocket.stages}</mark></Text>
                        <Text><code>Boosters: </code><mark>{Rocket.boosters}</mark></Text>

                        {/* First Stage */}
                        <Text fw={800} mt="xl" size="lg">First Stage</Text>
                        <Text><code>Engines: </code><mark>{Rocket.first_stage.engines}</mark></Text>
                        <Text><code>Reusable: </code><mark>{Rocket.first_stage.reusable ? 'Yes' : 'No'}</mark></Text>
                        <Text><code>Fuel Amount: </code><mark>{Rocket.first_stage.fuel_amount_tons} tons</mark></Text>
                        <Text><code>Burn Time: </code><mark>{Rocket.first_stage.burn_time_sec} sec</mark></Text>
                        <Text><code>Thrust (Sea Level):</code>
                            <mark>{metricSystem ? `${Rocket.first_stage.thrust_sea_level.kN} kN` : `${Rocket.first_stage.thrust_sea_level.lbf} lbf`}</mark>
                        </Text>
                        <Text><code>Thrust (Vacuum):</code>
                            <mark>{metricSystem ? `${Rocket.first_stage.thrust_vacuum.kN} kN` : `${Rocket.first_stage.thrust_vacuum.lbf} lbf`}</mark>
                        </Text>

                        {/* Second Stage */}
                        <Text fw={800} mt="xl" size={'lg'}>Second Stage</Text>
                        <Text><code>Engines:</code> <mark>{Rocket.second_stage.engines}</mark></Text>
                        <Text><code>Reusable:</code> <mark>{Rocket.second_stage.reusable ? 'Yes' : 'No'}</mark></Text>
                        <Text><code>Fuel Amount:</code> <mark>{Rocket.second_stage.fuel_amount_tons} tons</mark></Text>
                        <Text><code>Burn Time:</code> <mark>{Rocket.second_stage.burn_time_sec} sec</mark></Text>
                        <Text><code>Thrust:</code>
                            <mark>{metricSystem ? `${Rocket.second_stage.thrust.kN} kN` : `${Rocket.second_stage.thrust.lbf} lbf`}</mark>
                        </Text>
                        <Text><code>Payload Option:</code> <mark>{Rocket.second_stage.payloads.option_1}</mark></Text>
                        <Text><code>Fairing Height:</code>
                            <mark>{metricSystem ? `${Rocket.second_stage.payloads.composite_fairing.height.meters} m` : `${Rocket.second_stage.payloads.composite_fairing.height.feet} ft`}</mark>
                        </Text>
                        <Text><code>Fairing Diameter:</code>
                            <mark>{metricSystem ? `${Rocket.second_stage.payloads.composite_fairing.diameter.meters} m` : `${Rocket.second_stage.payloads.composite_fairing.diameter.feet} ft`}</mark>
                        </Text>

                        <div className={classes.externalLinks}>
                            <ActionIcon
                                radius="xl"
                                component={Link}
                                to={Rocket.wikipedia}
                                size={50}
                                style={{ background: "#000000dd" }}
                            >
                                <BsWikipedia size={30} color={"#ffffff"} />
                            </ActionIcon>
                        </div>

                    </div>
                </div>
            </section>
        </Modal>
    )
}

export default Rocket_Modal;
