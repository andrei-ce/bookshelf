import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import landingBackground from '../Assets/landing_background.jpg';

const Landing = () => {
  return (
    <Flex align='center' justify='center' w='100%' h='91vh' flex='1'>
      <Box
        w='100%'
        h='100%'
        bgImage={`url(${landingBackground})`}
        bgPosition='cover'
        bgRepeat='no-repeat'
        bgSize='cover'>
        <h1>This is the landing view</h1>
      </Box>
    </Flex>
  );
};

export default Landing;
