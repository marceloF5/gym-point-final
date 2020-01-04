import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/Auth/SignIn';
import Enrollment from '~/pages/Enrollments/Enrollment';
import Enrollments from '~/pages/Enrollments';
import HelpOrders from '~/pages/HelpOrders';
import Plan from '~/pages/Plans/Plan';
import Plans from '~/pages/Plans';
import Student from '~/pages/Students/Student';
import Students from '~/pages/Students';

import Route from '~/routes/route';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />

            <Route path="/students" exact component={Students} isPrivate />
            <Route path="/students/create" component={Student} isPrivate />
            <Route path="/students/:id" component={Student} isPrivate />

            <Route path="/plans" exact component={Plans} isPrivate />
            <Route path="/plans/create" component={Plan} isPrivate />
            <Route path="/plans/:id" component={Plan} isPrivate />

            <Route
                path="/enrollments"
                exact
                component={Enrollments}
                isPrivate
            />
            <Route
                path="/enrollments/create"
                component={Enrollment}
                isPrivate
            />
            <Route path="/enrollments/:id" component={Enrollment} isPrivate />

            <Route path="/help-orders" component={HelpOrders} isPrivate />
        </Switch>
    );
}
