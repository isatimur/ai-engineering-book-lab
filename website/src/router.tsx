import { Route, Switch } from 'wouter';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';
import { Versions } from './pages/Versions';
import { Quality } from './pages/Quality';

export const Router = () => (
  <Switch>
    <Route path="/" component={Catalogue} />
    <Route path="/visual-guide" component={VisualGuide} />
    <Route path="/read" component={Reader} />
    <Route path="/versions" component={Versions} />
    <Route path="/quality" component={Quality} />
    <Route>
      <Catalogue />
    </Route>
  </Switch>
);
