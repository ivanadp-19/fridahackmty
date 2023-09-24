"use client";
import { Grid } from "@mantine/core";
import Link from "next/link";
import { ArticleCardFooter } from "../components/Cards/ArticleCardFooter";
import HeaderSimple from "../components/heabar/SimpleHeader";

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
              category={Data[index][0]}
            />
            </Link>
          </Grid.Col>
        
          ))}
  
    </Grid>
  
    </>
    ;
  } 