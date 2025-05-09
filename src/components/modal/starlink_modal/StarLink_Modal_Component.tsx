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
                        <Text><code>Satellite ID:</code> <mark>{StarLink.spaceTrack.OBJECT_ID}</mark></Text>
                        <Text><code>Latitude:</code> <mark>{StarLink.latitude}</mark></Text>
                        <Text><code>Longitude:</code> <mark>{StarLink.longitude}</mark></Text>
                        <Text><code>Height:</code> <mark>{StarLink.height_km.toFixed(3)} km</mark></Text>
                        <Text><code>Velocity :</code> <mark>{StarLink.velocity_kms.toFixed(3)} km/s</mark></Text>
                        <Text><code>Launch Date:</code> <mark>{StarLink.spaceTrack.LAUNCH_DATE}</mark></Text>
                        <Text><code>Launch Site:</code> <mark>{StarLink.spaceTrack.SITE}</mark></Text>
                        <Text><code>Classification Type:</code> <mark>{StarLink.spaceTrack.CLASSIFICATION_TYPE}</mark></Text>
                        <Text><code>Originator:</code> <mark>{StarLink.spaceTrack.ORIGINATOR}</mark></Text>
                        <Text><code>OMM Version:</code> <mark>{StarLink.spaceTrack.CCSDS_OMM_VERS}</mark></Text>
                        <Text><code>File ID:</code> <mark>{StarLink.spaceTrack.FILE}</mark></Text>
                        <Text><code>GP Identifier:</code> <mark>{StarLink.spaceTrack.GP_ID}</mark></Text>
                        <Text><code>Epoch Time: </code><mark>{StarLink.spaceTrack.EPOCH}</mark></Text>
                        <Text><code>Mean Motion: </code><mark>{StarLink.spaceTrack.MEAN_MOTION} revs. per day</mark></Text>
                        <Text><code>Orbital Eccentricity: </code><mark>{StarLink.spaceTrack.ECCENTRICITY}</mark></Text>
                        <Text><code>Inclination: </code><mark>{StarLink.spaceTrack.INCLINATION}°</mark></Text>
                        <Text><code>RA of Ascending Node: </code><mark>{StarLink.spaceTrack.RA_OF_ASC_NODE}°</mark></Text>
                        <Text><code>Argument of Perigee: </code><mark>{StarLink.spaceTrack.ARG_OF_PERICENTER}°</mark></Text>
                        <Text><code>Mean Anomaly: </code><mark>{StarLink.spaceTrack.MEAN_ANOMALY}°</mark></Text>
                        <Text><code>Semi-Major Axis: </code><mark>{StarLink.spaceTrack.SEMIMAJOR_AXIS} km</mark></Text>
                        <Text><code>Apogee Altitude: </code><mark>{StarLink.spaceTrack.APOAPSIS} km</mark></Text>
                        <Text><code>Perigee Altitude: </code><mark>{StarLink.spaceTrack.PERIAPSIS} km</mark></Text>
                        <Text><code>Orbital Period: </code><mark>{StarLink.spaceTrack.PERIOD} mins</mark></Text>
                        <Text><code>BSTAR Drag Term: </code><mark>{StarLink.spaceTrack.BSTAR} mins</mark></Text>
                        <Text><code>Mean Motion Derivative: </code><mark>{StarLink.spaceTrack.MEAN_MOTION_DOT} mins</mark></Text>
                        <Text><code>Mean Motion 2nd Derivative: </code><mark>{StarLink.spaceTrack.MEAN_MOTION_DDOT} mins</mark></Text>
                        <Text><code>Reference Frame: </code><mark>{StarLink.spaceTrack.REF_FRAME} mins</mark></Text>
                        <Text><code>Time System: </code><mark>{StarLink.spaceTrack.TIME_SYSTEM} mins</mark></Text>
                        <Text><code>Ephemeris Type: </code><mark>{StarLink.spaceTrack.EPHEMERIS_TYPE} mins</mark></Text>
                        <Text><code>Element Theory: </code><mark>{StarLink.spaceTrack.MEAN_ELEMENT_THEORY} mins</mark></Text>
                    </div>
                </div>
            </section>
        </Modal>
    )
}

export default StarLink_Modal;
