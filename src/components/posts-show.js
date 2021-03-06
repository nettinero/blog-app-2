import React, { Component } from 'react';
import { deletePost, fetchPost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
        });
  }

  render() {
    const { post } = this.props;

  if (!post) {
    return <div>Lataa...</div>;
  }

    return (
      <div>
        <Link to="/" className="btn btn-primary pull-xs-right">Palaa viesteihin</Link>
          <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)} >
            Poista viesti
          </button>
        <h3>{post.title}</h3>
        <h6>Nimimerkki:{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
