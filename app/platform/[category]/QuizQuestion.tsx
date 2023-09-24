"use client";
import { useState } from 'react';
import { Stepper, Button, Group, Title, Text, Stack, Center, Modal, Grid, rem} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Confetti from 'react-confetti'
import { IconX, IconCheck, IconMinus, IconMailOpened} from '@tabler/icons-react';

export default function QuizQuestions(params:any) {
    const [opened, { open, close }] = useDisclosure(false);

  
console.log(params.Exams)
console.log("ESA")

  const [active, setActive] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const nextStep = () => {
    // Check if the selected answer is correct and update the score
    if (selectedAnswer !== null && selectedAnswer === params.Exams[active].rightChoice) {
      setCorrectAnswers(correctAnswers + 1);
    }

    // Move to the next question or complete the quiz
    setActive((current) => (current < params.Exams.length  ? current + 1 : current));
    setSelectedAnswer(null); // Reset selected answer for the next question
  };
  const finishQuiz = () => {
    setSelectedAnswer(null); 
    // Move to the next question or complete the quiz
    params.setQuizPage(0);
    // Reset selected answer for the next question
    };

    


  const prevStep = () => {
    // Move to the previous question
    setActive((current) => (current > 0 ? current - 1 : current));
    setSelectedAnswer(null); // Reset selected answer for the previous question
  };

  const handleOptionClick = (optionIndex:any) => {
    //deactivate the button if the user has already selected an answer and change question
   if(selectedAnswer !== null){
         return;
    }
    // Check if the selected answer is correct and update the score
    if (optionIndex === params.Exams[active].rightChoice) {
        setCorrectAnswers(correctAnswers + 1);
    }else{
        open();
    }

    // Handle user's option selection
    setSelectedAnswer(optionIndex);

  };


  return (
    <>
    <Modal opened={opened} onClose={close} title="Resultados de quiz">
        <Text>¡La tuviste mal!</Text>
    </Modal>
      <Stepper active={active} onStepClick={setActive} size="xs" mt={60}>
  {params.Exams.map((question, index) => (
    <Stepper.Step key={index}>
      
      <Title order={3} mb="md">{`Pregunta ${index + 1}`}</Title>
      <Grid>
        <Grid.Col span={4}>
     
        <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        mx="lg"
    >{question.question}</Text>

      </Grid.Col>
      <Grid.Col span={8}>
      <Stack>
        {question.options.map((option, optionIndex) => (
          <Button
            key={optionIndex}
            size="lg"
            onClick={() => handleOptionClick(optionIndex)}
            //make the button gradient if it is the right answer
            variant={selectedAnswer === question.rightChoice ? 'gradient' : 'outline'}
            disabled={(selectedAnswer !== question.rightChoice) && (selectedAnswer)} 
          >
            {option}
          </Button>
        ))}
      </Stack>
      </Grid.Col>
      </Grid>
    </Stepper.Step>
  ))}
  <Stepper.Completed>
    <Confetti width={2000}
    height={2000}></Confetti>
    <Center>
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: 'teal', to: 'cyan', deg: 125 }}
    >
      Completado, tu score es de {correctAnswers} sobre {params.Exams.length}
    </Text>
        
    </Center>
  </Stepper.Completed>
</Stepper>


      <Group justify="center" mt="80">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Atrás
        </Button>
        {active === params.Exams.length ? (
          <Button onClick={finishQuiz} variant="gradient">
            Terminar Quiz
          </Button>
        ) : (
          <Button onClick={nextStep}>Siguiente pregunta</Button>
        )}
      </Group>

      
    </>
  );
}
