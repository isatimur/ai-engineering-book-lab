import { Route, Switch } from 'wouter';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';

export const Router = () => (
  <Switch>
    <Route path="/" component={Catalogue} />
    <Route path="/visual-guide" component={VisualGuide} />
    <Route path="/read" component={Reader} />
    <Route>
      <Catalogue />
    </Route>
  </Switch>
);
