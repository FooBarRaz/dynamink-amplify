import React, {Component} from 'react';
import {withAuthenticator} from "aws-amplify-react";

class CreateTargetSite extends Component {
    render() {
        return (
            <div>
                Hello let's create something
            </div>
        );
    }
}


export default withAuthenticator(CreateTargetSite, true);
