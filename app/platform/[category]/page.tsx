
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Box, Burger, Center, Image, Loader} from '@mantine/core';
import ButtonGroup from './listsOfFiles';
import MainMenu from './MainMenu';
import Platform from './platform';

async function getFiles(categoria:string) {
  const res = await fetch(`http://3.18.163.82:5000/get_subject/${categoria}`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
async function getExam(categoria:string) {
  const res = await fetch(`http://3.18.163.82:5000/get_quiz/${categoria}`)

  //Put Loading
  console.log('Loading')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  else{
    console.log(res)
  }

 
  return res.json()
}

export default async function PlatformPage({ params }:{params:{category:string}}) {
  const files = await getFiles(params.category)
  const exams = await getExam(params.category)
  console.log(exams)

  return (
    
        <Platform params={{category: params.category, Files:files, Exams:exams}}  ></Platform>

  );
}

