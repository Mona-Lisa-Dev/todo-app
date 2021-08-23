import * as Yup from 'yup';
import RegisterForm from 'components/RegisterForm';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(7)
    .max(18)
    .matches(
      /^[a-z0-9_-]{7,18}$/,
      'Password can contain letters, numbers, hyphens and underscores',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required(),
  age: Yup.number().required().positive().integer(),
  agreed: Yup.bool(true).required(),
});

const RegisterPage = () => {
  return <RegisterForm validationSchema={validationSchema} />;
};

export default RegisterPage;
