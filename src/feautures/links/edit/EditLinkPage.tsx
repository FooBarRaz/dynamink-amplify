import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withAuth } from '../../../app/withAuth';
import { Button, FormControl, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { actions, selectLink, updateLink } from '../linksStore';
import { Link } from '../types';
import { useDispatch } from 'react-redux';

type EditLinkPageProps = {};

const EditLinkPage: React.FC<EditLinkPageProps> = (props) => {
    const {linkId} = useParams<{ linkId: string }>()
    const dispatch = useAppDispatch();
    const link = useAppSelector(selectLink(linkId))
    const [formFields, setFormFields] = useState<{ name: string; url: string }>()

    const linkToFormFields = (link: Link) => ({name: link.name, url: link.configuration.value})

    useEffect(() => {
        if (link) {
            dispatch(actions.beginEditing(linkId))
            setFormFields(linkToFormFields(link))
        }
    }, [link])

    const updateForm = (change: any) => {
        console.log('change to link: ', change)
        if (change.target?.name) {
            setFormFields({...formFields, [change.target.name]: change.target.value} as typeof formFields)
        }
    }

    const submit = (e: any) => {
        e.preventDefault()
        if (formFields) {
            dispatch(updateLink(linkId)(formFields))
        }
    }

    return (
        <div id="edit-link-form">
            <Typography variant="h4">Edit Link {linkId}</Typography>
            {link && formFields && <form onChange={updateForm} onSubmit={submit}>
                <TextField label="Name" name="name" variant="standard" value={formFields.name}/>
                <TextField label="URL" name="url" variant="standard" value={formFields.url}/>
                <Button type="submit">Update</Button>
            </form>}
        </div>
    );
};

export default withAuth(EditLinkPage)
