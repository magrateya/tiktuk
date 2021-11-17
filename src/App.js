import { Switch, Route } from 'react-router-dom';
import { Suspense } from 'react';
import PostsView from '../src/views/PostsView';
import UserDetailView from '../src/views/UserDetailView';
import Container from '../src/components/Container/Container';
import LoaderBlur from './components/LoaderBlur/LoaderBlur';

export default function App() {
  return (
    <Container>
      <Suspense fallback={<LoaderBlur />}>
        <Switch>
          <Route path="/" exact>
            <PostsView />
          </Route>

          <Route path="/:userName">
            <UserDetailView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
