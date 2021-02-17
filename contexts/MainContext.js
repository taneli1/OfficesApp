import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [update, setUpdate] = useState(0);

  return (
    <MainContext.Provider
      value={{
        update,
        setUpdate,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
