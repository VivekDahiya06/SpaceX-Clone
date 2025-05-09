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
                        <Text style={{ textAlign: 'justify' }}><code>Description: </code>{Rocket.description}</Text>
                        <Text><code>Company: </code><span>{Rocket.company}</span></Text>
                        <Text><code>Active: </code>
                            <Badge color={Rocket.active ? "green" : "red"}>{Rocket.active ? "Yes" : "No"}</Badge>
                        </Text>
                        <Text><code>Country: </code><span>{Rocket.country}</span></Text>
                        <Text><code>Type: </code><span>{Rocket.type}</span></Text>
                        <Text><code>Height: </code>
                            <span>{metricSystem ? Rocket.height.meters + ' m' : Rocket.height.feet + ' ft'}</span>
                        </Text>
                        <Text><code>Diameter: </code>
                            <span>{metricSystem ? Rocket.diameter.meters + ' m' : Rocket.diameter.feet + ' ft'}</span>
                        </Text>
                        <Text><code>Mass: </code>
                            <span>{metricSystem ? (Rocket.mass.kg) / 1000 + ' t' : (Rocket.mass.lb) / 1000 + ' short ton'}</span>
                        </Text>
                        <Text><code>Cost Per Launch: </code><span>${Rocket.cost_per_launch.toLocaleString()} USD</span></Text>
                        <Text><code>Success Rate: </code><span>{Rocket.success_rate_pct + '%'}</span></Text>
                        <Text><code>First Flight: </code><span>{Rocket.first_flight}</span></Text>
                        <Text><code>Stages: </code><span>{Rocket.stages}</span></Text>
                        <Text><code>Boosters: </code><span>{Rocket.boosters}</span></Text>

                        {/* First Stage */}
                        <Text fw={800} mt="xl" size="lg">First Stage</Text>
                        <Text><code>Engines: </code><span>{Rocket.first_stage.engines}</span></Text>
                        <Text><code>Reusable: </code><span>{Rocket.first_stage.reusable ? 'Yes' : 'No'}</span></Text>
                        <Text><code>Fuel Amount: </code><span>{Rocket.first_stage.fuel_amount_tons} tons</span></Text>
                        <Text><code>Burn Time: </code><span>{Rocket.first_stage.burn_time_sec} sec</span></Text>
                        <Text><code>Thrust (Sea Level):</code>
                            <span>{metricSystem ? `${Rocket.first_stage.thrust_sea_level.kN} kN` : `${Rocket.first_stage.thrust_sea_level.lbf} lbf`}</span>
                        </Text>
                        <Text><code>Thrust (Vacuum):</code>
                            <span>{metricSystem ? `${Rocket.first_stage.thrust_vacuum.kN} kN` : `${Rocket.first_stage.thrust_vacuum.lbf} lbf`}</span>
                        </Text>

                        {/* Second Stage */}
                        <Text fw={800} mt="xl" size={'lg'}>Second Stage</Text>
                        <Text><code>Engines:</code> <span>{Rocket.second_stage.engines}</span></Text>
                        <Text><code>Reusable:</code> <span>{Rocket.second_stage.reusable ? 'Yes' : 'No'}</span></Text>
                        <Text><code>Fuel Amount:</code> <span>{Rocket.second_stage.fuel_amount_tons} tons</span></Text>
                        <Text><code>Burn Time:</code> <span>{Rocket.second_stage.burn_time_sec} sec</span></Text>
                        <Text><code>Thrust:</code>
                            <span>{metricSystem ? `${Rocket.second_stage.thrust.kN} kN` : `${Rocket.second_stage.thrust.lbf} lbf`}</span>
                        </Text>
                        <Text><code>Payload Option:</code> <span>{Rocket.second_stage.payloads.option_1}</span></Text>
                        <Text><code>Fairing Height:</code>
                            <span>{metricSystem ? `${Rocket.second_stage.payloads.composite_fairing.height.meters} m` : `${Rocket.second_stage.payloads.composite_fairing.height.feet} ft`}</span>
                        </Text>
                        <Text><code>Fairing Diameter:</code>
                            <span>{metricSystem ? `${Rocket.second_stage.payloads.composite_fairing.diameter.meters} m` : `${Rocket.second_stage.payloads.composite_fairing.diameter.feet} ft`}</span>
                        </Text>

                        <div className={classes.externalLinks}>
                            <ActionIcon
                                radius="xl"
                                component={Link}
                                to={Rocket.wikipedia}
                                target="_blank"
                                rel='noreferrer noopener'
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
