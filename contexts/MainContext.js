import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUsingAnonymously, setIsUsingAnonymously] = useState(false);
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(0);
  const [updtFavorites, setUpdtFavorites] = useState(0);

  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isUsingAnonymously,
        setIsUsingAnonymously,
        user,
        setUser,
        update,
        setUpdate,
        updtFavorites,
        setUpdtFavorites,
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
