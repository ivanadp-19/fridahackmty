"use client";
import { Grid, Stack } from "@mantine/core";
import Link from "next/link";
import { ArticleCardFooter } from "../components/Cards/ArticleCardFooter";
import HeaderSimple from "../components/heabar/SimpleHeader";
import { HeroBullets } from "./HeroBullets";

export default  function LandingPage({Data}) {
  
    
    console.log(Data)
    
    return <>
    <HeaderSimple/>


    
    <Grid mx={300} >
    {Data.map((article, index) => (
      
        <Grid.Col span={4} key={index}>
          <Link href={`/platform/${Data[index][0]}`}>
            <ArticleCardFooter
              key={index}
              title={Data[index][0]}
              image={Data[index][1]}
              category="Sexto Semestre"
            />
            </Link>
          </Grid.Col>
        
          ))}
  
    </Grid>

  
    </>
    ;
  } 