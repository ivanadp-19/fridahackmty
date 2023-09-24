"use client";
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Box, Burger, Center, Image } from '@mantine/core';
import ButtonGroup from './listsOfFiles';
import MainMenu from './MainMenu';



export default function Platform({ params }:{params:{category:string, Files:string, Exams:any}}) {
  const [opened, { toggle }] = useDisclosure();
  console.log(params.Exams);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
     
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Center>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_del_ITESM.svg" w='50' mt={5}/>
        </Center>
      </AppShell.Header>


      <AppShell.Navbar p="md"  >
        <ButtonGroup category = {params.category} files ={params.Files}></ButtonGroup>
      </AppShell.Navbar>
      //change color to grey

      <AppShell.Main >
        <MainMenu category = {params.category} Exams={ params.Exams}></MainMenu>
      </AppShell.Main>
    </AppShell>
  );
}

