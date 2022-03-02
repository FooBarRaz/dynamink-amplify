import React, {useState} from 'react';
import {withAuthenticator} from "aws-amplify-react";
import {API} from 'aws-amplify';
import { TextField, Typography } from '@mui/material';

type LinkValues = {
    'url': string
    'text': string
}

type LinkTypes =  keyof LinkValues

type DynamicLink<LinkType extends LinkTypes> = {
    name?: string;
    type: LinkType
    value: LinkValues[LinkType]
}

const foo: DynamicLink<'text'> = {
    name: 'foo',
    type: 'text',
    value:  '1234'
}

interface State {
    siteName: string,
    redirectUrl: string,
    errors: string[]
    success?: string;
}

const CreateTargetSite = () => {
    const initialState: State = {siteName: '', redirectUrl: '', errors: [] };
    const [state, setState] = useState(initialState);

    function createSite() {
        console.log(`making api call to create site: ${state.siteName} that redirects to ${state.redirectUrl}`)
        setState({...state, success: undefined, errors: []})
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
            <Typography variant="h4">Create a Dynamic Link</Typography>
            <label>Link name:</label>
            <input type="text" name="siteName" onChange={({target: {value}}) => setState({...state, siteName: value})}/>
            <br/>
            <TextField label="Name" variant="standard" />
            <label> Redirect to:</label>
            <input type="text" name="redirectUrl" onChange={({target: {value}}) => setState({...state, redirectUrl: value})}/>
            <button type="submit" onClick={createSite}>Create</button>
            {
                state.errors.map((eachError: any, index: number) => {
                        return (<p key={`error-${index}`} style={{color: "red"}}>ERROR: {eachError}</p>)
                    }
                )
            }
            { state.success && <div>successfully created link</div> }
        </div>
    )
}

export default withAuthenticator(CreateTargetSite, true);
