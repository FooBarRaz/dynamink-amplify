import React, { useEffect } from 'react';
import { withAuthenticator } from "aws-amplify-react";
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions as linkActions } from '../linksStore';
import { CreateSiteForm } from './CreateSiteForm';
//
// type LinkValues = {
//     'url': string
//     'text': string
// }
//
// type LinkTypes = keyof LinkValues
//
// type DynamicLink<LinkType extends LinkTypes> = {
//     name?: string;
//     type: LinkType
//     value: LinkValues[LinkType]
// }
//
// const foo: DynamicLink<'text'> = {
//     name: 'foo',
//     type: 'text',
//     value: '1234'
// }
//

const CreatePage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(linkActions.fetchAllMyLinks())
    }, [])

    return (
        <div>
            <Typography variant="h4">Create a Dynamic Link</Typography>
            <CreateSiteForm />
        </div>
    )
}

export default withAuthenticator(CreatePage, true);
