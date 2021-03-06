import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';

interface withAuthHeaderProps {
    authHeader: string
}

/**
 * Inject Authentication Header inside the Component's Prop
 * @param Component - React Component
 */
function withAuthHeader<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
):React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c?.authState) {
            return (
              <Component
                {...props}
                authHeader={
                  `${c.authState.authTokenType} ${c.authState.authToken}`
                }
              />
            );
          } else {
            return <Component {...props} authHeader={null}/>;
          }
        }}
      </AuthContextConsumer>
    );
  };
}

export default withAuthHeader;
