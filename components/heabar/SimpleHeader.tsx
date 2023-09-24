"use client";
import { useState } from 'react';
import { Container, Group, Burger,Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderSimple.module.css';

const links = [
  { link: '/Login', label: 'Login' },
];

export default function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/4/47/Logo_del_ITESM.svg" h='40
        '/>
        <Group gap={5} visibleFrom="xs">
          
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}