
import { Container, Grid, SimpleGrid, Skeleton, rem, Stack, Card } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import classes from './MainMenu.module.css';
import Quiz from './quiz';
import Stats from './stats';
const PRIMARY_COL_HEIGHT = rem(600);

export default function MainMenu(params:any) {
  const theme = useMantineTheme();

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  console.log(params.Exams)
  return (
    <Container my="md" >
     
     <Card h={PRIMARY_COL_HEIGHT} radius="md"  shadow='sm' withBorder  mb="md" padding="50">
                <Quiz Exams = {params.Exams}></Quiz>
              </Card>
        <Grid gutter="md">
          
          <Grid.Col span={6}>
            <Stack>
              
              <Card h={SECONDARY_COL_HEIGHT} radius="md"  shadow='sm' withBorder>
                <Stats></Stats>
              </Card> 
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
          <Stack>
            <Card h={SECONDARY_COL_HEIGHT} radius="md"  shadow='sm' withBorder></Card> 
            
            </Stack>
          </Grid.Col>
        </Grid>
        <Card h={PRIMARY_COL_HEIGHT} radius="md"  shadow='sm' withBorder mt="md" />
    </Container>
  );
}