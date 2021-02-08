import React from 'react';
import {
  Stack,
  Image,
  Text,
  Flex,
  Box,
  Container,
  useColorMode,
} from '@chakra-ui/react';

import lightBackground from '../Assets/landing_background_light.jpg';
import darkBackground from '../Assets/landing_background_dark.jpg';

const Landing = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      w='100%'
      h='100%'
      align='center'
      justify='center'
      w='100%'
      h='90vh'
      flex='1'
      bgImage={
        colorMode === 'light' ? `url(${lightBackground})` : `url(${darkBackground})`
      }
      bgPosition='cover'
      bgRepeat='no-repeat'
      bgSize='cover'>
      <Container centerContent>
        <Box
          padding='4'
          bg={colorMode === 'light' ? `gray.300` : `gray.600`}
          maxW='7xl'
          borderRadius='10px'
          boxShadow='dark-lg'>
          <Text textAlign={['center', 'center', 'left', 'left']} fontSize='4xl'>
            Welcome!
          </Text>
          <hr />
          <br />
          <Stack
            justify={['center', 'center', 'left', 'left']}
            align={['center', 'center', 'left', 'left']}
            direction={['column', 'column', 'row', 'row']}
            spacing={3}>
            <Image
              boxSize='200px'
              objectFit='cover'
              src='https://source.unsplash.com/rBYYsIQcPBE'
              alt='Woman reading'
            />
            <Text fontSize='md'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
              voluptatum, perspiciatis repudiandae ratione id quidem, facere totam quos
              laborum ipsum deleniti ipsam voluptatibus quo rem? Dolorem eum deleniti
              placeat debitis! Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Text>
          </Stack>
        </Box>
      </Container>
    </Flex>
  );
};

export default Landing;
