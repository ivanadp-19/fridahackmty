
import { Grid } from "@mantine/core";
import Link from "next/link";
import { ArticleCardFooter } from "../components/Cards/ArticleCardFooter";
import HeaderSimple from "../components/heabar/SimpleHeader";
import LandingPage from "./landingpage";
// make article card footer a list with columns and props
//make object of Muck up data
//map the data to the list


async function getData() {
  const res = await fetch('http://3.18.163.82:5000/get_subjects')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function HomePage() {
  const data = await getData()
  
  
  return <LandingPage Data ={data}>

  </LandingPage>
  
} 