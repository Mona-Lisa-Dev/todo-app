import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { yupResolver } from '@hookform/resolvers/yup';

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

import styles from './LoginForm.module.scss';

const LoginForm = ({ validationSchema }) => {
  const { handleSubmit, errors, register, setValue, getValues } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmitForm = data => {
    console.log(data);
    const user = getValues();
    console.log('user', user);
  };

  return (
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
              // required
              type="email"
              label="E-mail"
              variant="outlined"
            />
          }
          rules={{ required: true }}
          name="email"
          register={register({ required: true })}
          setValue={setValue}
        />
        <FormHelperText>{errors.email?.message}</FormHelperText>
      </div>

      <div className={styles.inputWrapper}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <RHFInput
            as={
              <OutlinedInput
                // required
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
            // rules={{ required: true, minLength: 7, maxLength: 18 }}
            register={register}
            setValue={setValue}
          />
        </FormControl>
        <FormHelperText>{errors.password?.message}</FormHelperText>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
