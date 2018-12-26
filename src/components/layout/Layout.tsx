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

export const Layout: SFC<LayoutProps> = ({
  header,
  children,
  navItems = [],
  headerBackground = { className: 'bg-white', isLight: true }
}) => (
  <>
    <header
      className={classNames('navbar justify-content-start sticky-top shadow-sm', headerBackground.className, {
        'navbar-light': headerBackground.isLight,
        'navbar-dark': !headerBackground.isLight
      })}
    >
      {header}
    </header>
    <main className="col-sm-10 mx-auto mb-5 py-3 px-0 px-xs-2">{children}</main>
    <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
      <ul className="navbar-nav nav-justified w-100">
        {navItems.map((navItem, index) => (
          <li key={`nav-item-${index}`} className="nav-item">
            {navItem}
          </li>
        ))}
      </ul>
    </nav>
  </>
);
