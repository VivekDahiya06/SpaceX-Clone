// Import Statements
import { FC } from 'react';
import { StarLink_Details_Type } from '../../../Types/StarLink.types';
import { useStarLinkStore } from '../../../store/StarLink.store';
import satellite_background from '/images/satellite_background.png';
import { Modal, Text } from '@mantine/core';
import classes from './StarLink_Modal.module.scss';

// Props Definition
interface Props{
    StarLink: StarLink_Details_Type;
}

const StarLink_Modal: FC<Props> = ({ StarLink }) => {

    // States & Hooks
    const showModal = useStarLinkStore(state => state.showModal);
    const toggleModal = useStarLinkStore(state => state.toggleModal);

    return (
        <Modal opened={showModal} onClose={toggleModal} z-index={11} size={'lg'} title={<Text fw={900} size="xl">{StarLink.spaceTrack.OBJECT_NAME}</Text>}>
            <section className={classes.modal}>
                <div>
                    <img
                        src={satellite_background}
                        alt={StarLink.spaceTrack.OBJECT_NAME}
                        className={classes.modalImage}
                        loading='lazy'
                    />
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalDetails}>
                        <Text><code>Satellite ID:</code> <span>{StarLink.spaceTrack.OBJECT_ID}</span></Text>
                        <Text><code>Latitude:</code> <span>{StarLink.latitude}</span></Text>
                        <Text><code>Longitude:</code> <span>{StarLink.longitude}</span></Text>
                        <Text><code>Height:</code> <span>{StarLink.height_km.toFixed(3)} km</span></Text>
                        <Text><code>Velocity :</code> <span>{StarLink.velocity_kms.toFixed(3)} km/s</span></Text>
                        <Text><code>Launch Date:</code> <span>{StarLink.spaceTrack.LAUNCH_DATE}</span></Text>
                        <Text><code>Launch Site:</code> <span>{StarLink.spaceTrack.SITE}</span></Text>
                        <Text><code>Classification Type:</code> <span>{StarLink.spaceTrack.CLASSIFICATION_TYPE}</span></Text>
                        <Text><code>Originator:</code> <span>{StarLink.spaceTrack.ORIGINATOR}</span></Text>
                        <Text><code>OMM Version:</code> <span>{StarLink.spaceTrack.CCSDS_OMM_VERS}</span></Text>
                        <Text><code>File ID:</code> <span>{StarLink.spaceTrack.FILE}</span></Text>
                        <Text><code>GP Identifier:</code> <span>{StarLink.spaceTrack.GP_ID}</span></Text>
                        <Text><code>Epoch Time: </code><span>{StarLink.spaceTrack.EPOCH}</span></Text>
                        <Text><code>Mean Motion: </code><span>{StarLink.spaceTrack.MEAN_MOTION} revs. per day</span></Text>
                        <Text><code>Orbital Eccentricity: </code><span>{StarLink.spaceTrack.ECCENTRICITY}</span></Text>
                        <Text><code>Inclination: </code><span>{StarLink.spaceTrack.INCLINATION}°</span></Text>
                        <Text><code>RA of Ascending Node: </code><span>{StarLink.spaceTrack.RA_OF_ASC_NODE}°</span></Text>
                        <Text><code>Argument of Perigee: </code><span>{StarLink.spaceTrack.ARG_OF_PERICENTER}°</span></Text>
                        <Text><code>Mean Anomaly: </code><span>{StarLink.spaceTrack.MEAN_ANOMALY}°</span></Text>
                        <Text><code>Semi-Major Axis: </code><span>{StarLink.spaceTrack.SEMIMAJOR_AXIS} km</span></Text>
                        <Text><code>Apogee Altitude: </code><span>{StarLink.spaceTrack.APOAPSIS} km</span></Text>
                        <Text><code>Perigee Altitude: </code><span>{StarLink.spaceTrack.PERIAPSIS} km</span></Text>
                        <Text><code>Orbital Period: </code><span>{StarLink.spaceTrack.PERIOD} mins</span></Text>
                        <Text><code>BSTAR Drag Term: </code><span>{StarLink.spaceTrack.BSTAR} mins</span></Text>
                        <Text><code>Mean Motion Derivative: </code><span>{StarLink.spaceTrack.MEAN_MOTION_DOT} mins</span></Text>
                        <Text><code>Mean Motion 2nd Derivative: </code><span>{StarLink.spaceTrack.MEAN_MOTION_DDOT} mins</span></Text>
                        <Text><code>Reference Frame: </code><span>{StarLink.spaceTrack.REF_FRAME} mins</span></Text>
                        <Text><code>Time System: </code><span>{StarLink.spaceTrack.TIME_SYSTEM} mins</span></Text>
                        <Text><code>Ephemeris Type: </code><span>{StarLink.spaceTrack.EPHEMERIS_TYPE} mins</span></Text>
                        <Text><code>Element Theory: </code><span>{StarLink.spaceTrack.MEAN_ELEMENT_THEORY} mins</span></Text>
                    </div>
                </div>
            </section>
        </Modal>
    )
}

export default StarLink_Modal;
