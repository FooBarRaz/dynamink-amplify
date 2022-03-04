import { withAuthenticator } from 'aws-amplify-react';

export const withAuth = (component: React.JSXElementConstructor<any>) => withAuthenticator(component, true)
