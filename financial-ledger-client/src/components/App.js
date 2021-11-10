import 'bootstrap/dist/css/bootstrap.min.css'
import AppRouter from 'components/Router';
import {token} from 'shared/util/localStorage'


function App() {
  let isLogin = false;
  if(token) {
    isLogin = true;
  }
  return (
    <>
      <AppRouter isLogin={isLogin}/>
    </>
  );
}

export default App;
