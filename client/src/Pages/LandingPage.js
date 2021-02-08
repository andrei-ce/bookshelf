import React from 'react';
import { Container } from '@chakra-ui/react';

import Hero from '../Components/Hero';
import Background from '../Components/Background';

const LandingPage = () => {
  return (
    <Background>
      <Container centerContent>
        <Hero
          title='Welcome, young reader!'
          imageUrl='https://source.unsplash.com/rBYYsIQcPBE'
          imageAlt='Woman reading'
          description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse voluptatum,
          perspiciatis repudiandae ratione id quidem, facere totam quos laborum ipsum
          deleniti ipsam voluptatibus quo rem? Dolorem eum deleniti placeat debitis!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor
          sit amet consectetur adipisicing elit.'
        />
      </Container>
    </Background>
  );
};

export default LandingPage;
