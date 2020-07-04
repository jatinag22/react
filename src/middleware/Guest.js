import React from 'react';
import Cookies from 'js-cookie';
import { withRouter, Redirect } from 'react-router-dom';

export default function Guest(WrappedComponenet) {
    class GuestHOC extends React.Component {
        render() {
            const token = Cookies.get('token');
            return token ? <Redirect to="/" /> : <WrappedComponenet />;
        }
    }

    return withRouter(GuestHOC);
    
}