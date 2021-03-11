import {useState} from 'react';

const useSearch = (callback) => {
  const [inputs, setInputs] = useState({
    search: '',
  });

  const handleInputChange = (name, text) => {
    // console.log(name, text);
    // console.log('inputs state', inputs);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useSearch;
