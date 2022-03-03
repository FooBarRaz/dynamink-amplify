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
            setLinks(state, action: PayloadAction<any>) {
                state.myLinks = action.payload
            },
            setCreationSuccess(state, action: PayloadAction<string>) {
                state.creation.successMessage = action.payload
            },
            setCreationError(state, action: PayloadAction<string>) {
                state.creation.errors = [action.payload]
            },
            beginCreation(state) {
                state.creation.errors = []
                state.creation.successMessage = undefined
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
            .then(resp => {
                const baseUrl = 'https://od70m57nm1.execute-api.us-east-1.amazonaws.com/dev/'
                const newId = resp.data.targetSite

                const message = baseUrl + newId

                return options.dispatch(actions.setCreationSuccess(message));
            })
            .catch(err => options.dispatch(actions.setCreationError(err.message)))
    });

export const fetchAllMyLinks = createAsyncThunk('links/fetchAll',
    (payload, options) => {
        const request = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        }

        API.get("DynaminkREST", "/targets", request)
            .then(resp => {
                return options.dispatch(actions.setLinks(resp));
            })
            .catch(err => options.dispatch(actions.setCreationError(err.message)))
});

export const actions = {
    ...linksSlice.actions,
    createLink,
    fetchAllMyLinks
}

