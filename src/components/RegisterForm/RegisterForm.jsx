import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import Button from '@material-ui/core/Button';

import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { handleSubmit, control, errors, register, setValue } = useForm();
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
      <h2>Sign up</h2>
      <section className={styles.formLabel}>
        <RHFInput
          as={
            <TextField required type="text" label="Name" variant="outlined" />
          }
          rules={{ required: true }}
          name="name"
          register={register({
            minLength: {
              value: 2,
            },
          })}
          setValue={setValue}
        />
        {errors.name && (
          <span className={styles.errorMessage}>
            The name is required and must contain at least two letters
          </span>
        )}
      </section>

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
            register={register({
              pattern: /^[a-z0-9_-]{7,18}$/,
            })}
            setValue={setValue}
          />
          {errors.password && (
            <span className={styles.errorMessage}>
              Password length cannot be shorter than 7 characters, can contain
              letters, numbers, hyphens and underscores
            </span>
          )}
        </FormControl>
      </section>

      <section className={styles.formLabel}>
        <RHFInput
          as={
            <TextField required type="number" label="Age" variant="outlined" />
          }
          rules={{ required: true }}
          name="age"
          register={register({
            min: {
              value: 1,
            },
          })}
          setValue={setValue}
        />
      </section>

      <section className={styles.checkbox}>
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
      </section>

      <Button type="submit" variant="contained" color="primary">
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
