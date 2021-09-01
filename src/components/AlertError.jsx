import { useState } from 'react';

import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const alerStyles = {
  position: 'absolute',
  top: '2%',
  right: '2%',
  opacity: 0.8,
};

const AlertError = ({ error }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse style={{ ...alerStyles }} in={open}>
      <Alert
        severity="error"
        onClose={() => {
          setOpen(false);
        }}
      >
        {error}
      </Alert>
    </Collapse>
  );
};

export default AlertError;
