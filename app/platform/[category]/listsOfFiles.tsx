
import { Button, Center, Stack, Title, Modal} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconLogout, IconSwitchHorizontal, IconUpload } from "@tabler/icons-react";
import classes from './NavbarSegmented.module.css';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone } from "@mantine/dropzone";
import DropzoneButton from "./Dropzone";

  

export default  function ButtonGroup(props: any) {
     
   
    
    const [opened, { open, close }] = useDisclosure(false);
    const muckUpButtonData = [
        { label: "Andy-Hunt-Pragmatic-Thinking-and-Learning_-Refactor-Your-Wetware-Pragmatic-Programmers-2008-Pragmatic-Bookshelf-libgen.lc_.pdf"},
        { label: "Button 2"},
        { label: "Button 3"},
        { label: "Button 4"},
        { label: "Button 5"},
        { label: "Button 6"},
        { label: "Button 7"},
        { label: "Button 8"},
       

    ]
    const theme = useMantineTheme();
    console.log(props.files);
    return (
        <>
        <Modal  opened={opened} onClose={close} title="Subir archivos" centered>
        {<DropzoneButton category = {props.category}  setOpened={{open,close}} />}
         </Modal>
        <Center>
        <Title order={4} pb="md" >Archivos de {props.category}</Title>
        </Center>
        <Stack  >
            {props.files.map((button,index:number) => (
                <Button justify="flex-start" key={button} leftSection={<IconArrowRight size={14} />} variant="default" color="dark" fullWidth >{button}</Button>
            ))}
        </Stack>
       
        <div className={classes.footer} >
        <a href="#" className={classes.link} onClick={open}>
          <IconUpload className={classes.linkIcon} stroke={1.5} />
          <span>Subir Archivo</span>
        </a>
      </div>

        </>
    )
}