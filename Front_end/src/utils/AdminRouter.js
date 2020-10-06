import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from '../components/Layout';
import routes from '../routers'
const showContent = (routes) => {
    let result = [];

    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return (<Route key={index}
                path={'/admin' + route.to}
                exact={route.exact}
                component={route.main} />
            )
        })
    }
    return <Switch>{result}</Switch>;
}


const AdminRouter = () => {
    return (
        <React.Fragment>
            <Layout>
                {showContent(routes)}
            </Layout>
        </React.Fragment>
    );
}

export default AdminRouter;