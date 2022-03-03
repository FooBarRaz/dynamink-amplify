import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from '../types';

type Props = {
    link: Link
};

export const LinkCard = (props: Props) => {
    const { link } = props;
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography>{link.name}</Typography>
                    <Typography>{link.targetSite}</Typography>
                    <Typography>Type: {link.configuration.type}</Typography>
                    <Typography>Target: {link.configuration.value}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};
