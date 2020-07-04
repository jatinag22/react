import React from 'react';
import Cookies from 'js-cookie';
import { withRouter, Redirect } from 'react-router-dom';

export default function Auth(WrappedComponenet) {
    class AuthHOC extends React.Component {
        render() {
            const token = Cookies.get('token');
            return !token ? <Redirect to="/login" /> : <WrappedComponenet />;
        }
    }

    return withRouter(AuthHOC);
}