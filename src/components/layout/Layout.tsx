import React, { ReactNode, SFC } from 'react';
import classNames from 'classnames';

export interface LayoutProps {
  header?: ReactNode;
  navItems?: ReactNode[];
  headerBackground?: {
    className: string;
    isLight?: boolean;
  };
}

const Layout: SFC<LayoutProps> = ({
  header,
  children,
  navItems = [],
  headerBackground = { className: 'bg-white', isLight: true }
}) => (
  <div>
    <nav
      className={classNames('navbar sticky-top shadow-sm', headerBackground.className, {
        'navbar-light': headerBackground.isLight,
        'navbar-dark': !headerBackground.isLight
      })}
    >
      {header}
    </nav>
    <div className="col-sm-10 mx-auto mb-5 py-3 px-0 px-xs-2">{children}</div>
    <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
      <ul className="navbar-nav nav-justified w-100">
        {navItems.map(navItem => (
          <li className="nav-item">{navItem}</li>
        ))}
      </ul>
    </nav>
  </div>
);

export default Layout;
