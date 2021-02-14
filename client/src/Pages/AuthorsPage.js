import React, { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Container,
  CircularProgress as Spinner,
  useColorMode,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Background from '../Components/Background';
import axiosCall from '../Utils/axios';
import { delay } from '../Utils/utils';

const AuthorsPage = ({ isAuth }) => {
  const { colorMode } = useColorMode();

  // states
  const [authors, setAuthors] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  // functions
  const searchAuthors = (e) => {
    setSearchText(e.target.value);
  };

  const loadTableContent = () => {
    let rows = authors
      .filter((author) => {
        let fullName = author.firstName + ' ' + author.lastName;
        return (
          fullName.toLowerCase().includes(searchText.toLowerCase()) ||
          searchText === ''
        );
      })
      .map((author, i) => (
        <Tr key={i}>
          <Td>{author.firstName}</Td>
          <Td>{author.lastName}</Td>
          <Td isNumeric mr={2} pt={1} pb={1}>
            <Tooltip label={isAuth ? 'Edit author' : 'Login to edit'}>
              <Link to={isAuth ? `/authors/edit/${author._id}` : '#'}>
                <Button isDisabled={!isAuth} variant='outline' p={0}>
                  <FaEdit />
                </Button>
              </Link>
            </Tooltip>
          </Td>
        </Tr>
      ));

    if (rows.length === 0) {
      return (
        <Tr w='600px' backgroundColor='red.300'>
          <Th>
            <Text color='gray.800'>No results match your criteria</Text>
          </Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      );
    } else {
      return rows;
    }
  };

  // effects
  useEffect(async () => {
    // This setTimeout is only for UI purposes (to see the spinner)
    await delay(1000);
    let fetchedAuthors = await axiosCall.GET('/authors');
    setAuthors(fetchedAuthors.data);
    setLoading(false);
  }, []);

  return (
    <Background>
      {/* SEARCH BAR SECTION  ======================  */}
      <Flex
        backgroundColor={colorMode === 'light' ? 'gray.300' : 'gray.800'}
        borderRadius='md'
        p={1}
        mt={1}
        position='absolute'
        top={['15px', '15px', '35px', '35px']}>
        <InputGroup>
          <InputRightElement
            pointerEvents='none'
            children={<FaSearch color='gray.300' />}
          />
          <Input
            type='text'
            maxW='200px'
            onChange={(e) => searchAuthors(e)}
            border='transparent'
            placeholder='Search authors...'
            _placeholder={{ color: colorMode === 'light' ? 'gray.600' : 'gray.300' }}
          />
        </InputGroup>
        <Tooltip label={isAuth ? 'Edit author' : 'Login to edit'}>
          <Link to={isAuth ? '/authors/add' : '#'}>
            <Button
              isDisabled={!isAuth}
              mx={1}
              backgroundColor={colorMode === 'light' ? 'teal.400' : 'teal.600'}
              size='md'>
              Add Author
            </Button>
          </Link>
        </Tooltip>
      </Flex>
      {/* TABLE SECTION  ======================  */}

      <Container centerContent maxWidth='600px'>
        {loading ? (
          <Spinner isIndeterminate color='teal.400' size='120px' />
        ) : (
          <Table
            marginTop='15vh'
            marginBottom='10vh'
            borderRadius='md'
            variant='simple'
            colorScheme={colorMode === 'light' ? `gray` : `cyan`}
            backgroundColor={colorMode === 'light' ? `gray.300` : `gray.600`}>
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th isNumeric>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>{loadTableContent()}</Tbody>
            <Tfoot>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th isNumeric>Edit</Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
      </Container>
    </Background>
  );
};

AuthorsPage.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(AuthorsPage);
