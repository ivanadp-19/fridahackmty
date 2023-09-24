"use client";
import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';

export default function DropzoneButton(props:any) {
  const theme = useMantineTheme();
  const openRef = useRef(() => {});
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState([]);

  // Function to handle file drop
  const handleDrop = (files:any) => {
    setSelectedFile(files);
    setLoading(true);
    handleUpload();
  };
  
  // Function to handle file upload to API with props.category
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile[0]);
    formData.append('subject_name', props.category);
    fetch('http://3.18.163.82:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response)
      .then((result) => {
        console.log('Success:', result);
        setSelectedFile([]);
        setLoading(false);
        props.setOpened.close();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };



  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
        loading ={loading}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Deja los archivos aqui</Dropzone.Accept>
            <Dropzone.Reject>Cualquier archivo</Dropzone.Reject>
            <Dropzone.Idle>Subir archivo {props.category}</Dropzone.Idle>
          
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Sube tus archivos aqui para procesarlos.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()} variant="gradient">
        Seleccionar archivos
      </Button>
    </div>
  );
}