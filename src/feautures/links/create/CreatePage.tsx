import React, { useEffect, useState } from 'react';
import { withAuthenticator } from "aws-amplify-react";
import { API } from 'aws-amplify';
import { TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions as linkActions } from '../linksStore';

type LinkValues = {
    'url': string
    'text': string
}

type LinkTypes = keyof LinkValues

type DynamicLink<LinkType extends LinkTypes> = {
    name?: string;
    type: LinkType
    value: LinkValues[LinkType]
}

const foo: DynamicLink<'text'> = {
    name: 'foo',
    type: 'text',
    value: '1234'
}

interface State {
    siteName: string,
    redirectUrl: string,
    errors: string[]
    success?: string;
}

const CreatePage = () => {
    const initialState: State = {siteName: '', redirectUrl: '', errors: []};
    const [state, setState] = useState(initialState);
    const dispatch = useAppDispatch()
    const {myLinks, creation} = useAppSelector(state => state.links);
    const {errors, successMessage} = creation;

    const createLink = (siteName: string, url: string) => dispatch(linkActions.createLink({siteName, url}))

    useEffect(() => {
        dispatch(linkActions.fetchAllMyLinks())
    }, [])

    function createSite() {
        createLink(state.siteName, state.redirectUrl);
        // console.log(`making api call to create site: ${state.siteName} that redirects to ${state.redirectUrl}`)
        // setState({...state, success: undefined, errors: []})
        // const request = {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: {
        //         "targetSite": state.siteName,
        //         "redirectUrl": state.redirectUrl
        //     }
        //
        // }
        // API.post("DynaminkREST", "/targets", request)
        //     .catch(err => setState({...state, errors: [err]}))
    }


    return (
        <div>
            <Typography variant="h4">Create a Dynamic Link</Typography>
            <label>Link name:</label>
            <input type="text" name="siteName" onChange={({target: {value}}) => setState({...state, siteName: value})}/>
            <br/>
            {/*<TextField label="Name" variant="standard"/>*/}
            <label> Redirect to:</label>
            <input type="text" name="redirectUrl"
                   onChange={({target: {value}}) => setState({...state, redirectUrl: value})}/>
            <button type="submit" onClick={createSite}>Create</button>
            {
                state.errors.map((eachError: any, index: number) => {
                        return (<p key={`error-${index}`} style={{color: "red"}}>ERROR: {eachError}</p>)
                    }
                )
            }
            {successMessage && <div>successfully created link: <a href={successMessage}>{successMessage}</a></div>}
            {errors && !!errors.length ? <div>failed to create link: {JSON.stringify(errors)}</div> : null }
            {myLinks && !!myLinks.length ? <div>{JSON.stringify(myLinks)}</div> : null }
        </div>
    )
}

export default withAuthenticator(CreatePage, true);
