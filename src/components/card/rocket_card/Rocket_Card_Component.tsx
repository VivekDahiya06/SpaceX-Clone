import {
   ActionIcon,
   Badge,
   Button,
   Card,
   Image,
   Text,
   Transition,
 } from "@mantine/core";
 import React, { FC, useState } from "react";
 import classes from "./Rocket_Card.module.scss";
 import { Link } from "react-router-dom";
 import { BsWikipedia } from "react-icons/bs";
import Carousel_Component from "../../carousel/Carousel_Component";
 
interface Props {
   Rocket: Rocket_Details_Type;
}
 
 const Rocket_Card: FC<Props> = ({ Rocket }) => {
   const [hovered, setHovered] = useState<boolean>(false);
 
   return (
     <Card
       shadow="xl"
       padding="lg"
       radius="md"
       withBorder
       onMouseEnter={() => setHovered(true)}
       onMouseLeave={() => setHovered(false)}
       style={{
         width: 400,
         height: 450,
         display: "flex",
         flexDirection: "column",
         cursor: "pointer",
         position: "relative",
         overflow: "hidden",
       }}
     >
       
         {/* Card Section to show Image or Carousel */}
       <Card.Section style={{ height: "50%" }}>
         {hovered ? (
           <Carousel_Component Images={Rocket.flickr_images} />
         ) : (
           <Image
             src={Rocket.flickr_images[0]}
             height="100%"
             alt={Rocket.name}
             fit="cover"
             className={classes.image}
           />
         )}
       </Card.Section>
       
       
         {/* Details showed in case of Hover */}
       <Transition
         mounted={hovered}
         transition="slide-up"
         duration={400}
         timingFunction="ease-in-out"
       >
         {(styles) => (
           <div
             className={classes.details}
             style={{
               ...styles,
               zIndex: 10,
               position: "absolute",
               top: "50%",
               left: "0",
               width: "100%",
               height: "50%",
               backgroundColor: "#0000009a",
               color: "#fff",
               padding: "1em",
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
             }}
           >
             <div>
               <Text>
                 <code>Name:</code> <mark>{Rocket.name}</mark>
               </Text>
               <Text>
                 <code>Company:</code> <mark>{Rocket.company}</mark>
               </Text>
               <Text>
                 <code>Active:</code>{" "}
                 <Badge color={Rocket.active ? "green" : "red"}>
                   {Rocket.active ? "Yes" : "No"}
                 </Badge>
               </Text>
             </div>
 
             <div
               style={{
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "end",
               }}
             >
               <Button size="xs" variant="white">
                 Show More
               </Button>
               <ActionIcon
                 bg={"#e8e8e8dd"}
                 radius="xl"
                 component={Link}
                 to={Rocket.wikipedia}
                 size={30}
               >
                 <BsWikipedia size={15} color={"#000"} />
               </ActionIcon>
             </div>
           </div>
         )}
       </Transition>
     </Card>
   );
 };
 
 export default Rocket_Card;
 