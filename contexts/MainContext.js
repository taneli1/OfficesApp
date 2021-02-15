import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  return <MainContext.Provider>{children}</MainContext.Provider>;
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
