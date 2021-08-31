import { useState } from 'react';

import { Collapse } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const AlertError = ({ error }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
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
