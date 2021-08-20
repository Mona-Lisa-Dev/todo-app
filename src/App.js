import { Route, Switch } from 'react-router-dom';

import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
import AppBar from 'components/AppBar';
import Container from 'components/Container';

import routes from 'routes';
import './scss/_main.scss';

const App = () => {
  return (
    <>
      <AppBar />
      <Container>
        <Switch>
          <Route path={routes.signup} component={RegisterPage}></Route>
          <Route path={routes.login} component={LoginPage}></Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
