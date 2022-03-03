import * as React from 'react';
import { actions as linkActions } from '../linksStore';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useState } from 'react';

interface State {
    siteName: string,
    redirectUrl: string,
    errors: string[]
    success?: string;
}

export const CreateSiteForm = () => {
    const initialState: State = {siteName: '', redirectUrl: '', errors: []};
    const [state, setState] = useState(initialState);

    const createSite = () => dispatch(linkActions.createLink({siteName: state.siteName, url: state.redirectUrl}));
    const dispatch = useAppDispatch()
    const {creation} = useAppSelector(state => state.links);
    const {errors, successMessage} = creation;

    return (
        <div>
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
            {errors && !!errors.length ? <div>failed to create link: {JSON.stringify(errors)}</div> : null}
        </div>
    );
};
