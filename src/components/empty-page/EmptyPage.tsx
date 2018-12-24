import React, { SFC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CenteredPageLayout } from 'components/layout';

export type EmptyPageProps = {
  icon: IconProp;
  text: string | ReactNode;
  action: ReactNode;
};

const EmptyPage: SFC<EmptyPageProps> = ({ icon, text, action }) => {
  return (
    <CenteredPageLayout>
      <div>{icon && <FontAwesomeIcon icon={icon} size="7x" />}</div>
      <div>{text}</div>
      {action && <div className="m-5">{action}</div>}
    </CenteredPageLayout>
  );
};

export default EmptyPage;
