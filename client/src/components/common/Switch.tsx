import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import React from 'react';
import { tailwindColors } from '../../../colorPalette'

const MaterialUISwitch: React.FC<SwitchProps> = styled(Switch)(({ }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: tailwindColors.palette_1,
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="1 1 22 22"><path fill="${encodeURIComponent(
            tailwindColors.palette_1, //color of the svg
        )}" d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        //color of the track when unchecked
        backgroundColor: tailwindColors.palette_1
      },
    },
  },
  '& .MuiSwitch-thumb': {
    //color of the circle
    backgroundColor: tailwindColors.palette_5,
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="2 2 20 20"><path fill="${encodeURIComponent(
        tailwindColors.palette_1,
      )}" d="M19.31 18.9L22.39 22L21 23.39L17.88 20.32C17.19 20.75 16.37 21 15.5 21C13 21 11 19 11 16.5C11 14 13 12 15.5 12C18 12 20 14 20 16.5C20 17.38 19.75 18.21 19.31 18.9M15.5 19C16.88 19 18 17.88 18 16.5C18 15.12 16.88 14 15.5 14C14.12 14 13 15.12 13 16.5C13 17.88 14.12 19 15.5 19M21 4V6H3V4H21M3 16V14H9V16H3M3 11V9H21V11H18.97C17.96 10.37 16.77 10 15.5 10C14.23 10 13.04 10.37 12.03 11H3Z"/></svg>')`,
    },
    
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    //color of the track when checked
    backgroundColor: '#CAD2C5',
    borderRadius: 20 / 2,
  },
}));

export default MaterialUISwitch;