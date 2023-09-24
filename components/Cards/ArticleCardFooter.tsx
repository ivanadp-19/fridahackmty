"use client";
import {
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    Avatar,
    Badge,
    useMantineTheme,
    rem,
  } from '@mantine/core';
  import classes from './ArticleCardFooter.module.css';
  //Recieve props from app/page.tsx
//make card 300px width

 export function ArticleCardFooter(props: any) {
    const theme = useMantineTheme();
  
    return (
      <Card withBorder padding="lg" radius="md" className={classes.card}>
        <Card.Section mb="sm">
          <Image
            src={props.image}
            alt={props.title}
            height={180}
          />
        </Card.Section>
  
        <Badge w="fit-content" variant="light" color="Morado">
          {props.category}
        </Badge>
  
        <Text fw={700} className={classes.title} mt="xs">
          {props.title}
        </Text>
  
        
          
 
      </Card>
    );
  }
  