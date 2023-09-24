import { Container, Grid, SimpleGrid, Skeleton, rem, Stack, Card } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import classes from './MainMenu.module.css';

export default function Stats(params:any) {
    console.log(params.WordCount)
    return(
        <div>
            <h1>Contador de palabras</h1>
            {params.WordCount.map((wordle:any) => (
                <p>{wordle.word}: {wordle.count}</p>
            ))}

        </div>
    )
}