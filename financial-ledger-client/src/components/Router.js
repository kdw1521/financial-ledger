import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Header from 'components/layouts/Header';

function AppRouter() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Header/>
                    <Auth />
                </Route>
            </Switch>

        </Router>
    )
}

export default AppRouter;