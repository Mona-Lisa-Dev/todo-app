// import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    errors,
    trigger,
    getValues,
    register,
    setValue,
  } = useForm({
    criteriaMode: 'all',
    // mode: 'all',
    reValidateMode: 'onBlur',
  });

  const handleSubmitForm = async data => {
    console.log(data);
    const user = getValues();
    console.log('user', user);

    let isValid = await trigger();
    console.log(isValid);
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
          mode="onChange"
          as={
            <TextField
              required
              error={!!errors.name}
              // helperText={errors.name && errors.name?.message}
              type="text"
              label="Name"
              variant="outlined"
            />
          }
          name="name"
          register={register}
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          }}
          setValue={setValue}
        />

        {/* <input
          required
          type="text"
          name="name"
          ref={register({
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
        /> */}
        {errors.name && <FormHelperText>{errors.name?.message}</FormHelperText>}
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="email"
              error={!!errors.email}
              label="E-mail"
              variant="outlined"
            />
          }
          name="email"
          register={register}
          mode="onChange"
          rules={{
            required: 'E-mail is required',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'E-mail is not valid',
            },
          }}
          setValue={setValue}
        />
        {errors.email && (
          <FormHelperText>{errors.email?.message}</FormHelperText>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="password"
              error={!!errors.password}
              label="Password"
              variant="outlined"
            />
          }
          name="password"
          register={register}
          mode="onChange"
          rules={{
            required: 'Password is required',
            pattern: {
              value: /^[a-z0-9_-]{7,18}$/,
              message:
                'Password can contain letters, numbers, hyphens and underscores',
            },
            minLength: {
              value: 7,
              message: 'Password must be at least 7 characters',
            },
            maxLength: {
              value: 18,
              message: 'Password must be at most 18 characters',
            },
          }}
          setValue={setValue}
        />
        {errors.password && (
          <FormHelperText>{errors.password?.message}</FormHelperText>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="password"
              error={!!errors.passwordConfirmation}
              label="Repeat password"
              variant="outlined"
            />
          }
          name="passwordConfirmation"
          register={register}
          mode="onChange"
          rules={{
            required: 'Password is required',
            validate: {
              matchesPreviousPassword: value => {
                const { password } = getValues();
                return password === value || 'Passwords should match!';
              },
            },
          }}
          setValue={setValue}
        />

        {errors.passwordConfirmation && (
          <FormHelperText>
            {errors.passwordConfirmation?.message}
          </FormHelperText>
        )}
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
          name="age"
          register={register}
          mode="onChange"
          rules={{
            required: 'Age is required',
            valueAsNumber: true,
            validate: {
              positiveNumber: value =>
                parseFloat(value) > 0 || 'Value must be greater than 1',
            },
          }}
          setValue={setValue}
        />
        {errors.age && <FormHelperText>{errors.age?.message}</FormHelperText>}
      </div>

      <div className={styles.checkbox}>
        <Controller
          name="agreed"
          control={control}
          defaultValue={false}
          rules={{ required: true }}
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
        {errors.agreed && (
          <FormHelperText>{errors.agreed?.message}</FormHelperText>
        )}
      </div>

      <Button type="submit" variant="contained" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
