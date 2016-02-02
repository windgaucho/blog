import React, { Component, PropTypes } from 'react';
// reduxForm es casi identico a la funcion connect de redux.
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
    // crea un nuevo objeto (propiedad) de PostsNew, y le asigna el contexto de react
    // a la propiedad router del objeto. El contexto hay que tratar de no usarlo salvo
    // con react-router.
    // Especificamente se accede a la propiedad llamada router. Va a buscar en todos los
    // componentes padres para buscar esta propiedad. En definitiva va a ir a buscar el
    // contexto a la definicion del router en /index.js.
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        // llama al action creator.
        this.props.createPost(props)
            .then(() => {
                // El post se creó, navega al index.
                // Se navega llamando a this.context.router.push con el nuevo path.
                this.context.router.push('/')
            });
    }

    render() {
        const { fields: { title, categories, content }, handleSubmit } = this.props;
        // La instruccion es6 de arriba es igual a:
        // const title = this.props.fields.title
        // .... y
        // const handleSubmit = this.props.handleSubmit
        //
        //
        // {...title} y {...categories} y {...content} en los inputs quiere decir
        // que se le pasa todas las propiedades y eventos que tienen title, categories y
        // content dentro del input.
        //
        // handleSubmit es una funcion que provee redux-form para manejar el evento del form
        // cuando se le hace un submit.
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Nuevo Post</h3>

                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Titulo</label>
                    <input
                        type="text"
                        className="form-control"
                        {...title}
                    />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
                    <label>Categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        {...categories}
                    />
                    <div className="text-help">
                        {categories.touched ? categories.error : ''}
                    </div>
                </div>

                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
                    <label>Contenido</label>
                    <textarea
                        type="text"
                        className="form-control"
                        {...content}
                    />
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Crear</button>
                <Link to="/" className="btn btn-danger">Cancelar</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese el Titulo";
    }

    if (!values.categories) {
        errors.categories = "Ingrese las Categorias";
    }

    if (!values.content) {
        errors.content = "Ingrese el Contenido";
    }

    return errors;
}

// reduxForm se configura como connect de redux.
// estos campos estarán disponibles en el componente react de mas arriba a través de las props.
// y como tiene el mismo el comportamiento que connect podemos también configurar un action creator
// en este caso createPost.
// Configuración de connect: 1er argumento es mapStateToProps, 2do es mapDispatchToProps
// Configuración reduxForm: 1er argumento es form config, 2do es mapStateToProps, 3ro es mapDispatchToProps
export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);
