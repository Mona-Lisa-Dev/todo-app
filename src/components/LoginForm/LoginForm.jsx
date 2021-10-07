import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { useIntl } from 'react-intl';
import { Button, IconButton } from '@mui/material';
import {
  // IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  FormHelperText,
  // Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { login } from 'redux/auth/auth-operations';
import { translate } from 'i18n';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const { handleSubmit, errors, trigger, register, setValue, getValues } =
    useForm({
      mode: 'onChange',
    });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = event => event.preventDefault();

  const handleSubmitForm = async () => {
    const user = getValues();
    let isValid = await trigger();

    if (isValid) dispatch(login(user)); // lena@mail.ua 12345678
  };

  const loginText = translate('login');

  return (
    <form
      className={styles.LoginForm}
      onSubmit={handleSubmit(handleSubmitForm)}
      autoComplete="off"
    >
      <h2 className={styles.formTitle}>{loginText}</h2>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="email"
              label={translate('email')}
              variant="outlined"
            />
          }
          name="email"
          register={register}
          rules={{
            required: translate('email_required'),
          }}
          setValue={setValue}
          onChange={() => trigger('email')}
        />
        {errors.email && (
          <FormHelperText className={styles.helperText}>
            {errors.email?.message}
          </FormHelperText>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            {translate('password')}
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
                      title={intl.formatMessage({ id: 'password_visibility' })}
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
              required: translate('password_required'),
            }}
            setValue={setValue}
            onChange={() => trigger('password')}
          />
        </FormControl>
        {errors.password && (
          <FormHelperText className={styles.helperText}>
            {errors.password?.message}
          </FormHelperText>
        )}
      </div>

      <Button type="submit" variant="contained" color="primary">
        {loginText}
      </Button>
    </form>
  );
};

export default LoginForm;
