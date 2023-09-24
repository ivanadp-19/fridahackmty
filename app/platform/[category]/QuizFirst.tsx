import { Center, Title,Text, Button, Stack, Group } from "@mantine/core";
import Image from 'next/image'
import animacion from "../../../Assets/quizImage.gif";



export default function QuizFirst({setQuizPage}:any) {
    const handleCardClick = () => {
        setQuizPage(1);
        };

    return (
        <div>
            <Title 
            fw={900}
         
           order={1}
 
            p={20}
            >Quiz</Title>
            <Center>

        
        <Image
        src={animacion}
        height={414 / 1.2}
        width={506 / 1.2}
        unoptimized={true}
        />
            
        </Center >
        <Group justify="center">
        <Button mt={40} variant="gradient" onClick={handleCardClick}>Empezar Quiz</Button>
            </Group>
            
       
        </div>
    );
}