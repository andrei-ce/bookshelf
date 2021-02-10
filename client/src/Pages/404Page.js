import React from 'react';
import { Container, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';
import Background from '../Components/Background';

const FourOhFour = () => {
  return (
    <Background>
      <Container centerContent>
        <Hero
          landing={false}
          title='Ooops!'
          imageUrl='https://source.unsplash.com/VGOiY1gZZYg'
          imageAlt='Page not found'
          description={`The page you are trying to access does not exist...`}
        />
      </Container>
    </Background>
  );
};

export default FourOhFour;
