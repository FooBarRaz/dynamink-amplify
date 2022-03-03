import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from '../types';
import { toLink } from '../linksStore';

type Props = {
    link: Link
};

export const LinkCard = (props: Props) => {
    const {link} = props;
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography>{link.name}</Typography>
                    <Typography><a href={toLink(link.targetSite)} target="_blank"
                                   rel="noopener noreferrer">{link.targetSite}</a></Typography>
                    <Typography>Type: {link.configuration.type}</Typography>
                    <Typography>Target: {link.configuration.value}</Typography>
                </CardContent>
            </Card>
        </div>
    );
};
