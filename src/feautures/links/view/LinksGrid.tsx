// @flow
import * as React from 'react';
import { Link } from '../types';
import { Grid } from '@mui/material';
import { LinkCard } from './LinkCard';

type Props = {
    links: Link[]
};

export const LinksGrid = (props: Props) => {
    const {links} = props;

    return (
        <Grid container spacing={2}>
            {links.map(eachLink => {
                return <Grid item>
                       <LinkCard link={eachLink} />
                </Grid>;
            })}
        </Grid>
    );
};
