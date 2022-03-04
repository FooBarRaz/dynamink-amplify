// @flow
import * as React from 'react';
import { actions as linkActions, selectMyLinks } from '../linksStore';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { LinksGrid } from './LinksGrid';
import { Typography } from '@mui/material';

type Props = {

};

const MyLinksPage = (props: Props) => {
    const dispatch = useAppDispatch()
    const myLinks = useAppSelector(selectMyLinks);

    // useEffect(() => {
    //     dispatch(linkActions.fetchAllMyLinks())
    // }, [])

    return (
        <div>
            <Typography variant="h4">My Dynamic Links</Typography>
            <LinksGrid links={myLinks}/>
        </div>
    );
};
export default withAuthenticator(MyLinksPage, true);
