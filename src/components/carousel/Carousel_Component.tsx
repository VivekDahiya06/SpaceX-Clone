import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { FC, useRef, useEffect } from 'react';

interface Props {
    Images: string[];
}

const Carousel_Component: FC<Props> = ({ Images }) => {

    return (
        <Carousel
            withControls={true}
            withIndicators={false}
            loop
            slideSize="100%"
            align="start"
            slideGap="md"
        >
            {Images.map((image, index) => (
                <Carousel.Slide key={index}>
                    <Image src={image} height="100%" fit="cover" alt={`Slide ${index}`} />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
};

export default Carousel_Component;