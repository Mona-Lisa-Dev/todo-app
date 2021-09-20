import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import { signup } from 'redux/auth/auth-operations';
import { translate } from 'i18n';

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
    mode: 'onChange',
  });

  const dispatch = useDispatch();

  const handleSubmitForm = async data => {
    const user = getValues();
    let isValid = await trigger();

    if (isValid) dispatch(signup(user));
  };

  const name_required = translate('name_required');
  const name_err_msg = translate('name_err_msg');
  const email_required = translate('email_required');
  const email_err_msg = translate('email_err_msg');
  const password_required = translate('password_required');
  const password_err_msg = translate('password_err_msg');
  const password_short_err = translate('password_short_err');
  const password_long_err = translate('password_long_err');
  const passwords_should_match = translate('passwords_should_match');
  const age_required = translate('age_required');
  const age_err_msg = translate('age_err_msg');
  const signupText = translate('signup');

  return (
    <form
      className={styles.RegisterForm}
      onSubmit={handleSubmit(handleSubmitForm)}
      autoComplete="off"
    >
      <h2 className={styles.formTitle}>
        {/* Sign up */}
        {signupText}
      </h2>
      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              // error={!!errors.name}
              type="text"
              // label="Name"
              label={translate('name')}
              variant="outlined"
            />
          }
          name="name"
          register={register}
          rules={{
            // required: 'Name is required',
            required: name_required,
            minLength: {
              value: 3,
              // message: 'Name must be at least 3 characters',
              message: name_err_msg,
            },
          }}
          onChange={() => trigger('name')}
          setValue={setValue}
        />
        {errors.name && (
          <FormHelperText className={styles.helperText}>
            {errors.name?.message}
          </FormHelperText>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="email"
              // error={!!errors.email}
              // label="E-mail"
              label={translate('email')}
              variant="outlined"
            />
          }
          name="email"
          register={register}
          rules={{
            // required: 'E-mail is required',
            required: email_required,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              // message: 'E-mail is not valid',
              message: email_err_msg,
            },
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
        <RHFInput
          as={
            <TextField
              required
              type="password"
              // error={!!errors.password}
              // label="Password"
              label={translate('password')}
              variant="outlined"
            />
          }
          name="password"
          register={register}
          rules={{
            // required: 'Password is required',
            required: password_required,
            pattern: {
              value: /^[a-z0-9_-]{7,18}$/,
              // message:
              //   'Password can contain letters, numbers, hyphens and underscores',
              message: password_err_msg,
            },
            minLength: {
              value: 7,
              // message: 'Password must be at least 7 characters',
              message: password_short_err,
            },
            maxLength: {
              value: 18,
              // message: 'Password must be at most 18 characters',
              message: password_long_err,
            },
          }}
          setValue={setValue}
          onChange={() => trigger('password')}
        />
        {errors.password && (
          <FormHelperText className={styles.helperText}>
            {errors.password?.message}
          </FormHelperText>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              type="password"
              // error={!!errors.passwordConfirmation}
              // label="Repeat password"
              label={translate('repeat_password')}
              variant="outlined"
            />
          }
          name="passwordConfirmation"
          register={register}
          rules={{
            // required: 'Password is required',
            required: password_required,
            validate: {
              matchesPreviousPassword: value => {
                const { password } = getValues();
                // return password === value || 'Passwords should match!';
                return password === value || passwords_should_match;
              },
            },
          }}
          setValue={setValue}
          onChange={() => trigger('passwordConfirmation')}
        />

        {errors.passwordConfirmation && (
          <FormHelperText className={styles.helperText}>
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
              // error={!!errors.age}
              // label="Age"
              label={translate('age')}
              variant="outlined"
            />
          }
          name="age"
          register={register}
          mode="onChange"
          rules={{
            // required: 'Age is required',
            required: age_required,
            valueAsNumber: true,
            validate: {
              positiveNumber: value =>
                // parseFloat(value) > 0 || 'Value must be greater than 1',
                parseFloat(value) > 0 || age_err_msg,
            },
          }}
          setValue={setValue}
          onChange={() => trigger('age')}
        />
        {errors.age && (
          <FormHelperText className={styles.helperText}>
            {errors.age?.message}
          </FormHelperText>
        )}
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
              // label="I accept the terms of the User Agreement"
              label={translate('accept')}
            />
          )}
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        {/* Sign up */}
        {signupText}
      </Button>
    </form>
  );
};

export default RegisterForm;
