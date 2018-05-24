import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import auth from 'src/auth';

@connect((store) => {
    return {};
})
export default class Logout extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
    };

    componentDidMount() {
        this.props.dispatch(auth.actions.logout());
    }

    render() {
        return <div>See you again!</div>;
    }
}
