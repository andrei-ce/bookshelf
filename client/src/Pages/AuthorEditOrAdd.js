import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Background from '../Components/Background';
import AuthorForm from '../Components/Forms/AuthorForm';

import axiosCall from '../Utils/axios';

const AuthorEditOrAddPage = ({ location, ...props }) => {
  //receive query params = edit or add? --> pass into Form
  const authorId = props.match.params.authorId || null;
  // console.log(authorId);
  // console.log(location.pathname);
  const mode = location.pathname.startsWith('/authors/add') ? 'add' : 'edit';

  return (
    <Background>
      <AuthorForm mode={mode} />
    </Background>
  );
};

export default withRouter(AuthorEditOrAddPage);
