import { Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import Avatar from 'react-avatar';

const React = require('react'),
      ReactDom = require('react-dom'),
      CommentActions = require('../actions/comment_actions'),
      CommentStore = require('../stores/comment_store');


const CommentsIndexItem = React.createClass({
  render () {

    let comment = this.props.comment;
    let date = new Date(comment.created_at).toDateString();
    date = date.split(" ").splice(1, 2).join(" ");

    return (
      <div className="comments-index-item">
        <div className="comments-index-item-content">

          <div className="comments-index-item-author">

            <Avatar
              size={36}
              round={true}
              src={comment.avatar} />

              <ul>

                <li className="medium-color">
                  <Link to={`/user/${comment.commenter_id}`}>
                    {comment.commenter}
                  </Link>
                </li>

                <li className="publish-date">{date}</li>

              </ul>

          </div>

          <br />

          <p className='withprewrap'>
            {comment.body}
          </p>

          <br />
          <br />

        </div>
      </div>
    );
  }
});

module.exports = CommentsIndexItem;
