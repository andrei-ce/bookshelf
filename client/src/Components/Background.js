import React from 'react';
import { Flex, useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import lightBackground from '../Assets/landing_background_light.jpg';
import darkBackground from '../Assets/landing_background_dark.jpg';

const Background = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      align='center'
      justify='center'
      direction='column'
      flex='1'
      minHeight='90vh'
      marginTop='10vh'
      bgImage={
        colorMode === 'light' ? `url(${lightBackground})` : `url(${darkBackground})`
      }
      bgPosition='cover'
      bgRepeat='no-repeat'
      bgSize='cover'
      backgroundAttachment='fixed'>
      {children}
    </Flex>
  );
};

Background.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export default Background;
