import React, { useEffect } from 'react';
import { withAuthenticator } from "aws-amplify-react";
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions as linkActions, selectMyLinks } from '../linksStore';
import { CreateSiteForm } from './CreateSiteForm';
import { LinksGrid } from '../view/LinksGrid';
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
    const links = useAppSelector(selectMyLinks)

    useEffect(() => {
        dispatch(linkActions.fetchAllMyLinks())
    }, [])

    return (
        <div>
            <Typography variant="h4">Create a Dynamic Link</Typography>
            <CreateSiteForm />
            <LinksGrid links={links} />
        </div>
    )
}

export default withAuthenticator(CreatePage, true);
