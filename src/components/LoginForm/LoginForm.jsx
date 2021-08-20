import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import Button from '@material-ui/core/Button';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  //   FormHelperText,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { handleSubmit, errors, register, setValue } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <form
      className={styles.RegisterForm}
      onSubmit={handleSubmit(data => console.log(data))}
      autoComplete="off"
    >
      <h2 className={styles.formTitle}>Log in</h2>

      <section className={styles.formLabel}>
        <RHFInput
          as={
            <TextField
              required
              type="email"
              label="E-mail"
              variant="outlined"
            />
          }
          rules={{ required: true }}
          name="email"
          register={register}
          setValue={setValue}
        />
      </section>

      <section className={styles.formLabel}>
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
            rules={{ required: true }}
            // register={register({
            //   pattern: /^[a-z0-9_-]{7,18}$/,
            // })}
            register={register}
            setValue={setValue}
          />
          {/* {errors.password && (
            <FormHelperText>
              Password length cannot be shorter than 7 characters, can contain
              letters, numbers, hyphens and underscores
            </FormHelperText>
          )} */}
        </FormControl>
      </section>

      <Button type="submit" variant="contained" color="primary">
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
