import { FC, useEffect } from 'react';
import { Title } from "@mantine/core";
import classes from "./Landing.module.scss";

const Landing: FC = () => {
	useEffect(() => {console.log("Classes :",classes)}, [classes]);
	return (
		<>
			<Title className={classes.text}> This is the landing page </Title>
		</>
	);
};

export default Landing

