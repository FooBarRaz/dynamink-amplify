// @flow
import * as React from 'react';
import { actions as linkActions, selectMyLinks } from '../linksStore';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { LinksGrid } from './LinksGrid';

type Props = {

};

const MyLinksPage = (props: Props) => {
    const dispatch = useAppDispatch()
    const myLinks = useAppSelector(selectMyLinks);

    useEffect(() => {
        dispatch(linkActions.fetchAllMyLinks())
    }, [])

    return (
        <div>
            <LinksGrid links={myLinks}/>
        </div>
    );
};
export default withAuthenticator(MyLinksPage, true);
