"use client";

import { createTheme, MantineColorsTuple } from "@mantine/core";
const Morado: MantineColorsTuple = [
  "#faf0fd",
  "#ecdff0",
  "#d5bcde",
  "#be96cb",
  "#aa77bc",
  "#9e63b3",
  "#9958af",
  "#854999",
  "#77408a",
  "#68357a"
]
const MidnightMorado: MantineColorsTuple = [
  '#f7f1fb',
  '#e8e2ed',
  '#cdc2d7',
  '#b2a1c1',
  '#9b84ae',
  '#8d72a2',
  '#86699e',
  '#73588a',
  '#674d7c',
  '#5a426e'
];
export const theme = createTheme({
  /* Put your mantine theme override here */
  //white: "#f4842f"
  //primaryColor: "#f4842f"
  colors: {
    Morado,
    MidnightMorado,
  },
  defaultGradient: {
    from: 'Morado',
    to: 'red',
    deg: 45,
  },
  
  
 
});
