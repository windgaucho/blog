import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    // params es el id del post enviado en la url.
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
            .then(() => {
                // El post se creó, navega al index.
                // Se navega llamando a this.context.router.push con el nuevo path.
                this.context.router.push('/')
            });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div></div>;
        }

        return (
            <div>
                <Link to="/">Volver al Inicio</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Eliminar Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categorias: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
