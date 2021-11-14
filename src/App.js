import { Switch, Route } from 'react-router-dom';
import PostsView from '../src/views/PostsView';
import UserDetailView from '../src/views/UserDetailView';

export default function App() {
  return (
    // <Container>

    <Switch>
      <Route path="/" exact>
        <PostsView />
      </Route>

      <Route path="/:user">
        <UserDetailView />
      </Route>
    </Switch>

    // </Container>
  );
}
