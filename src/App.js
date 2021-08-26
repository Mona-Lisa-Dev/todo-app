import { Route, Switch } from 'react-router-dom';

import Homepage from 'pages/Homepage';
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
          <Route exact path={routes.home} component={Homepage}></Route>
          <Route path={routes.signup} component={RegisterPage}></Route>
          <Route path={routes.login} component={LoginPage}></Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
