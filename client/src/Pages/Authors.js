import React, { useState, useEffect } from 'react';
import {
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

import Background from '../Components/Background';
import axiosCall from '../Utils/axios';
import { delay } from '../Utils/utils';

const AuthorsPage = () => {
  const { colorMode } = useColorMode();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // This is only for UI purposes (to see the spinner)
    await delay(2000);
    let fetchedauthors = await axiosCall.get('/authors');
    setAuthors(fetchedauthors.data);
    setLoading(false);
  }, []);

  return (
    <Background>
      <Container maxWidth='600px' centerContent>
        {loading ? (
          <Spinner isIndeterminate color='teal.400' size='120px' />
        ) : (
          <Table
            marginTop='10vh'
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
            {/* Make it iterable */}
            <Tbody>
              {authors.map((author, i) => (
                <Tr key={i}>
                  <Td>{author.firstName}</Td>
                  <Td>{author.lastName}</Td>
                  <Td isNumeric>1</Td>
                </Tr>
              ))}
            </Tbody>
            {/* Make it iterable */}
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
