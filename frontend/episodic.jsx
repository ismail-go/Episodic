import { Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

const React = require('react'),
      ReactDOM = require('react-dom'),
      Modal = require('react-modal'),
      Header = require('./components/header'),
      SessionStore = require('./stores/session_store'),
      LoginForm = require('./components/login_form'),
      SignupForm = require('./components/signup_form'),
      SessionActions = require('./actions/session_actions'),
      MainIndex = require('./components/main_index'),
      StoryView = require('./components/story_view'),
      StoryForm = require('./components/story_form'),
      UserView = require('./components/user_view'),
      StoryEdit = require('./components/story_edit'),
      CommentsIndex = require('./components/comments_index');


// dev test
// window.SessionApiUtil = require('./util/session_api_util.jsx');
// window.SessionActions = require('./actions/session_actions');
// window.StoryActions = require('./actions/story_actions');
// window.StoryStore = require('./stores/story_store');

const App = React.createClass({
  render () {
    return (
      <div>
        <Header path={this.props.location.pathname}/>
        {this.props.children}
      </div>
    );
  }
});

let _ensureLoggedIn = (nextState, replace) => {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
};
// <Route path="login" component={LoginForm} />
// <Route path="signup" component={SignupForm} />
//

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MainIndex} />
    <Route path="/stories/:id" component={StoryView} />
    <Route path="/stories/:id/edit" component={StoryEdit} />
    <Route path="/new-story" component={StoryForm} onEnter={ _ensureLoggedIn }/>
    <Route path="/feed" component={MainIndex} onEnter={ _ensureLoggedIn }/>
    <Route path="/user/:id" component={UserView}>
      <IndexRoute component={MainIndex} />
      <Route path="stories" component={MainIndex}/>
      <Route path="comments" component={CommentsIndex}/>
    </Route>
  </Route>
);


document.addEventListener('DOMContentLoaded', () => {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }
  Modal.setAppElement(document.getElementById('content'));
  ReactDOM.render(
    <Router history={hashHistory} routes={routes} />,
    document.getElementById('content')
  );
});
