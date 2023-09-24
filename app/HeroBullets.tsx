import {  Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Image from 'next/image'
import ani from "../Assets/graduationMainFinal.gif";

import classes from './HeroBullets.module.css';

export function HeroBullets() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            La manera <span className={classes.highlight}>moderna</span> de aprender <br /> 
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever – Mantine includes
            more than 120 customizable components and hooks to cover you in any situation
          </Text>

          

          
        </div>
        <Image
        src={ani}
        height={415 / 1.4}
        width={988 / 1.4}
        unoptimized={true}
        />
      </div>
    </Container>
  );
}