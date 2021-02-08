import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Container,
  CircularProgress as Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import Background from '../Components/Background';
import axiosCall from '../Utils/axios';
import { delay } from '../Utils/utils';

const AuthorsPage = () => {
  const { colorMode } = useColorMode();
  const [authors, setAuthors] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const searchAuthors = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(async () => {
    // This setTimeout is only for UI purposes (to see the spinner)
    await delay(2000);
    let fetchedAuthors = await axiosCall.get('/authors');
    setAuthors(fetchedAuthors.data);
    setLoading(false);
  }, []);

  return (
    <Background>
      <Box
        backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.900'}
        borderRadius='md'
        p={1}
        mt={1}
        position='absolute'
        top={['15px', '15px', '60px', '60px']}>
        <InputGroup>
          <InputRightElement
            pointerEvents='none'
            children={<FaSearch color='gray.300' />}
          />
          <Input
            type='text'
            onChange={(e) => searchAuthors(e)}
            placeholder='Search...'
          />
        </InputGroup>
      </Box>
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
                <Th isNumeric>Books</Th>
              </Tr>
            </Thead>
            <Tbody>
              {authors
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
                    <Td isNumeric>1</Td>
                  </Tr>
                ))}
              {/* <Tr backgroundColor='red.100' textColor='gray.800'>
                No results match your criteria
              </Tr> */}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th isNumeric>Books</Th>
              </Tr>
            </Tfoot>
          </Table>
        )}
      </Container>
    </Background>
  );
};

export default AuthorsPage;
