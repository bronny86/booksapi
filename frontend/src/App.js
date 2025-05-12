import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import UpdateBook from './pages/UpdateBook';
import DeleteBook from './pages/DeleteBook';
import ShowBook from './pages/ShowBook';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/books/create" component={CreateBook} />
        <Route path="/books/details/:id" component={ShowBook} />
        <Route path="/books/edit/:id" component={UpdateBook} />
        <Route path="/books/delete/:id" component={DeleteBook} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;