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
  FormHelperText,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from './RegisterForm.module.scss';

const RegisterForm = () => {
  const { handleSubmit, control, errors, getValues, register, setValue } =
    useForm();
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
      onSubmit={handleSubmit(data => {
        console.log(data);
        const values = getValues();
        console.log('values', values);
      })}
      autoComplete="off"
    >
      <h2 className={styles.formTitle}>Sign up</h2>
      <section className={styles.formLabel}>
        <RHFInput
          as={
            <TextField required type="text" label="Name" variant="outlined" />
          }
          rules={{ required: true, minLength: 3 }}
          name="name"
          register={register}
          mode="onChange"
          setValue={setValue}
        />
        {errors.name && (
          <FormHelperText>
            The name is required and must contain at least 3 letters
          </FormHelperText>
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
            <FormHelperText>
              Password length cannot be shorter than 7 characters, can contain
              letters, numbers, hyphens and underscores
            </FormHelperText>
          )}
        </FormControl>
      </section>

      <section className={styles.formLabel}>
        <RHFInput
          as={
            <TextField required type="number" label="Age" variant="outlined" />
          }
          rules={{ required: true, min: 1 }}
          name="age"
          register={register}
          setValue={setValue}
          mode="onChange"
        />
        {errors.age && (
          <FormHelperText>Value must be greater than 1</FormHelperText>
        )}
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
