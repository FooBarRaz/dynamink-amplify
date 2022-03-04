import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from '../types';
import { toLink } from '../linksStore';
import { Link as RouterLink } from 'react-router-dom'

type Props = {
    link: Link
};

const anchor = (target: string, content?: string) => <a href={target} target="_blank" rel="noopener noreferrer">{content || target}</a>

export const LinkCard = (props: Props) => {
    const {link} = props;
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography>{link.name}</Typography>
                    <Typography>{anchor(toLink(link.targetSite), link.targetSite)}</Typography>
                    <Typography>Type: {link.configuration.type}</Typography>
                    <Typography>Target: {link.configuration.value}</Typography>
                    <Typography><RouterLink to={`/edit/${link.targetSite}`}>edit</RouterLink></Typography>
                </CardContent>
            </Card>
        </div>
    );
};
