import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'Cant be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  description: {
    presence: {
      message: 'Cant be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
};

const useUploadForm = (callback) => {
  const [uploadErrors, setUploadErrors] = useState({});
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (name, text) => {
    console.log(text);

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const handleInputEnd = (name, text) => {
    console.log('Upload input end: ', text);
    if (text === '') {
      text = null;
    }
    const err = validator(name, text, constraints);

    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: err,
      };
    });
  };

  const validateOnSend = () => {
    const titleErr = validator('title', inputs.title, constraints);

    const descriptionErr = validator(
      'description',
      inputs.description,
      constraints
    );

    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        title: titleErr,
        description: descriptionErr,
      };
    });

    if (titleErr !== null || descriptionErr !== null) {
      return false;
    }
    return true;
  };

  const reset = () => {
    setInputs({
      title: '',
      description: '',
    });
    setUploadErrors({});
  };
  return {
    handleInputChange,
    inputs,
    handleInputEnd,
    validateOnSend,
    uploadErrors,
    reset,
    setInputs,
  };
};

export default useUploadForm;
