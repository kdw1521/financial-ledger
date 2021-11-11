import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Header from 'components/layouts/Header';
import Home from 'routes/Home'
import LedgerDetail from "routes/LedgerDetail";

function AppRouter({isLogin}) {

    return (
        <Router>
            <Header isLogin={isLogin}/>
            <Switch>
                {isLogin ? (
                    <>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/detail" component={LedgerDetail} />
                    </>
                ) : (
                    <Route exact path="/" component={Auth} />
                )}
                
            </Switch>

        </Router>
    )
}

export default AppRouter;