import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
    // Solo se llama una vez cuando se crea el componente.
    componentWillMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div>Lista de posts</div>
        );
    }
}

/* Esta función está comentada porque también puede ser utilizada como se
muestra mas abajo en la sentencia export default concretamente en la parte
{ fetchPosts: fetchPosts }:
export default connect(null, { fetchPosts: fetchPosts }) (PostsIndex);

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPosts }, dispatch );
}
*/

//export default connect(null, { fetchPosts: fetchPosts }) (PostsIndex);
// Utilizando es6, la sentencia export default de arriba queda porque la propiedad
// fetchPosts se llama igual.
export default connect(null, { fetchPosts }) (PostsIndex);
