import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router';
import { RHFInput } from 'react-hook-form-input';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

import UIBtn from 'components/UI/UIBtn';
import { signup } from 'redux/auth/auth-operations';
import { translate } from 'i18n';

import routes from 'routes';
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

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitForm = async data => {
    const user = getValues();
    let isValid = await trigger();

    const { age, email, name, password } = user;

    if (isValid) {
      dispatch(signup({ age, email, name, password }));
      history.push(routes.not_completed_profile);
    }
  };

  return (
    <form
      className={styles.RegisterForm}
      onSubmit={handleSubmit(handleSubmitForm)}
      autoComplete="off"
    >
      <h2 className={styles.formTitle}>{translate('signup')}</h2>
      <div className={styles.inputWrapper}>
        <RHFInput
          as={
            <TextField
              required
              // error={!!errors.name}
              type="text"
              label={translate('name')}
              variant="outlined"
            />
          }
          name="name"
          register={register}
          rules={{
            required: translate('name_required'),
            minLength: {
              value: 3,
              message: translate('name_err_msg'),
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
              label={translate('email')}
              variant="outlined"
            />
          }
          name="email"
          register={register}
          rules={{
            required: translate('email_required'),
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: translate('email_err_msg'),
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
              label={translate('password')}
              variant="outlined"
            />
          }
          name="password"
          register={register}
          rules={{
            required: translate('password_required'),
            pattern: {
              value: /^[a-z0-9_-]{7,18}$/,
              message: translate('password_err_msg'),
            },
            minLength: {
              value: 7,
              message: translate('password_short_err'),
            },
            maxLength: {
              value: 18,
              message: translate('password_long_err'),
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
              label={translate('repeat_password')}
              variant="outlined"
            />
          }
          name="passwordConfirmation"
          register={register}
          rules={{
            required: translate('password_required'),
            validate: {
              matchesPreviousPassword: value => {
                const { password } = getValues();
                return (
                  password === value || translate('passwords_should_match')
                );
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
              label={translate('age')}
              variant="outlined"
            />
          }
          name="age"
          register={register}
          mode="onChange"
          rules={{
            required: translate('age_required'),
            valueAsNumber: true,
            validate: {
              positiveNumber: value =>
                parseFloat(value) > 0 || translate('age_err_msg'),
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
              label={translate('accept')}
            />
          )}
        />
      </div>

      <UIBtn classNameForm="contained" text="signup" type="submit" />
    </form>
  );
};

export default RegisterForm;
