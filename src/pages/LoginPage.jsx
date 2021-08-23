import * as Yup from 'yup';
import LoginForm from 'components/LoginForm';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .required()
    .min(7)
    .max(18)
    .matches(
      /^[a-z0-9_-]{7,18}$/,
      'Password can contain letters, numbers, hyphens and underscores',
    ),
});

const LoginPage = () => {
  return <LoginForm validationSchema={validationSchema} />;
};

export default LoginPage;
