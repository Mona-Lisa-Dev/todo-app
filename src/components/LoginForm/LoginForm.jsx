import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import AlertError from 'components/AlertError';

import { getErrorMessage } from 'redux/auth/auth-selectors';
import { login } from 'redux/auth/auth-operations';
import { clearError } from 'redux/auth/auth-actions';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { handleSubmit, errors, trigger, register, setValue, getValues } =
    useForm({
      mode: 'onChange',
    });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const error = useSelector(getErrorMessage);
  useEffect(() => dispatch(clearError()), [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmitForm = async () => {
    const user = getValues();

    let isValid = await trigger();
    console.log(isValid);

    if (isValid) dispatch(login(user)); // lena@mail.ua 12345678
  };

  return (
    <>
      {error && <AlertError error={error} />}
      <form
        className={styles.LoginForm}
        onSubmit={handleSubmit(handleSubmitForm)}
        autoComplete="off"
      >
        <h2 className={styles.formTitle}>Log in</h2>

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
            name="email"
            register={register}
            rules={{
              required: 'E-mail is required',
              // pattern: {
              //   value:
              //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //   message: 'E-mail is not valid',
              // },
            }}
            setValue={setValue}
            onChange={() => trigger('email')}
          />
          {errors.email && (
            <FormHelperText>{errors.email?.message}</FormHelperText>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <RHFInput
              as={
                <OutlinedInput
                  required
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              }
              name="password"
              register={register}
              rules={{
                required: 'Password is required',
                // pattern: {
                //   value: /^[a-z0-9_-]{7,18}$/,
                //   message:
                //     'Password can contain letters, numbers, hyphens and underscores',
                // },
                // minLength: {
                //   value: 7,
                //   message: 'Password must be at least 7 characters',
                // },
                // maxLength: {
                //   value: 18,
                //   message: 'Password must be at most 18 characters',
                // },
              }}
              setValue={setValue}
              onChange={() => trigger('password')}
            />
          </FormControl>
          {errors.password && (
            <FormHelperText>{errors.password?.message}</FormHelperText>
          )}
        </div>

        <Button type="submit" variant="contained" color="primary">
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
