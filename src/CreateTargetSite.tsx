import React, {useState} from 'react';
import {withAuthenticator} from "aws-amplify-react";
import {API} from 'aws-amplify';

interface State {
    siteName: string,
    redirectUrl: string,
    errors: string[]
}

const CreateTargetSite = () => {
    const initialState: State = {siteName: '', redirectUrl: '', errors: []};
    const [state, setState] = useState(initialState);

    function createSite() {
        console.log(`making api call to create site: ${state.siteName} that redirects to ${state.redirectUrl}`)
        const request = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: {
                "targetSite": state.siteName,
                "redirectUrl": state.redirectUrl
            }

        }
        API.post("DynaminkREST", "/targets", request)
            .catch(err => setState({...state, errors: [err]}))
    }


    return (
        <div>
            <div>Create a target site</div>
            <label> Site name:</label>
            <input type="text" name="siteName" onChange={({target: {value}}) => setState({...state, siteName: value})}/>
            <br/>
            <label> Redirect to:</label>
            <input type="text" name="redirectUrl" onChange={({target: {value}}) => setState({...state, redirectUrl: value})}/>
            <button type="submit" onClick={createSite}>Create</button>
            {
                state.errors.map((eachError: any, index: number) => {
                        return (<p key={`error-${index}`} style={{color: "red"}}>ERROR: {eachError}</p>)
                    }
                )
            }
        </div>
    )
}

export default withAuthenticator(CreateTargetSite, true);
