"use client";
import { Container, Grid, SimpleGrid, Skeleton, rem, Stack, Card, Title,Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import classes from './MainMenu.module.css';
import QuizFirst from './QuizFirst';
import QuizQuestion from './QuizQuestion';


export default function Quiz(params:any) {
    const [quizPage, setQuizPage] = useState(0);
//ternary operator
    console.log(params.Exams)
    return(
        <>
        {quizPage == 0 ? <QuizFirst setQuizPage = {setQuizPage}></QuizFirst> : <QuizQuestion setQuizPage = {setQuizPage} Exams = {params.Exams}></QuizQuestion>}
            
            
        </>
    )
}