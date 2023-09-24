import { Container, Grid, SimpleGrid, Skeleton, rem, Stack, Card, ScrollArea } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import classes from './MainMenu.module.css';

export default function SummaryCard(params:any) {
 
    return(
        <ScrollArea>
            <h1>Resumen</h1>
            <p>{params.Summary}</p>

        </ScrollArea>
    )
}