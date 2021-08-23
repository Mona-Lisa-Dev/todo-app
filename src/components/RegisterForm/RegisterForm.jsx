// import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import styles from './RegisterForm.module.scss';

const RegisterForm = ({ validationSchema }) => {
  const { handleSubmit, control, errors, getValues, register, setValue } =
    useForm({
      mode: 'onChange',
      resolver: yupResolver(validationSchema),
    });

  const handleSubmitForm = data => {
    console.log(data);
    const user = getValues();
    console.log('user', user);
  };

  return (
    <form
      className={styles.RegisterForm}
      onSubmit={handleSubmit(handleSubmitForm)}
      autoComplete="off"
    >
      <h2 className={styles.formTitle}>Sign up</h2>
      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField required type="text" label="Name" variant="outlined" />
          }
          // rules={{ required: true, minLength: 3 }}
          name="name"
          register={register}
          setValue={setValue}
        />
        <FormHelperText>{errors.name?.message}</FormHelperText>
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="email"
              label="E-mail"
              variant="outlined"
            />
          }
          // rules={{ required: true }}
          name="email"
          register={register}
          setValue={setValue}
        />
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="password"
              label="Password"
              variant="outlined"
            />
          }
          name="password"
          // rules={{ required: true }}
          register={register({
            pattern: /^[a-z0-9_-]{7,18}$/,
          })}
          setValue={setValue}
        />
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="password"
              label="Repeat password"
              variant="outlined"
            />
          }
          name="confirmPassword"
          // rules={{ required: true }}
          register={register}
          setValue={setValue}
        />
        <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="number"
              InputProps={{ inputProps: { min: 1, max: 99 } }}
              label="Age"
              variant="outlined"
            />
          }
          // rules={{ required: true, min: 1 }}
          name="age"
          register={register}
          setValue={setValue}
        />
        <FormHelperText>{errors.age?.message}</FormHelperText>
      </div>

      <div className={styles.checkbox}>
        <Controller
          name="agreed"
          control={control}
          defaultValue={false}
          // rules={{ required: true }}
          render={props => (
            <FormControlLabel
              control={
                <Checkbox
                  required
                  color="primary"
                  onChange={e => props.onChange(e.target.checked)}
                  checked={props.value}
                />
              }
              label="I accept the terms of the User Agreement"
            />
          )}
        />
        <FormHelperText>{errors.agreed?.message}</FormHelperText>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
