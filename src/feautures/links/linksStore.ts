import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';

type Link = any;

type LinkState = {
    myLinks: Link[],
    creation: {
        errors: string[],
        successMessage?: string;
    }
}

const initialState: LinkState = {
    myLinks: [],
    creation: {
        errors: [],
    }
};

const linksSlice = createSlice({
        name: 'links',
        initialState,
        reducers: {
            setCreationSuccess(state, action: PayloadAction<any>) {
                state.creation.successMessage = JSON.stringify(action.payload)
            },
            setCreationError(state, action: PayloadAction<string>) {
                state.creation.errors = [action.payload]
            }
        }
    }
)

export const reducer = linksSlice.reducer;


// actions

type CreateSiteRequest = {
    siteName: string;
    url: string;
}
export const createLink = createAsyncThunk('links/create',
    (payload: CreateSiteRequest, options) => {
        const request = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: {
                "targetSite": payload.siteName,
                "redirectUrl": payload.url,
            }

        }
        API.post("DynaminkREST", "/targets", request)
            .then(resp => options.dispatch(actions.setCreationSuccess(resp)))
            .catch(err => options.dispatch(actions.setCreationError(err.message)))
    });

export const actions = {
    ...linksSlice.actions,
    createLink
}

