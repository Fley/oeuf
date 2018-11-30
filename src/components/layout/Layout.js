import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// TODO: convert to HOC ?

const Layout = ({ header, children, navItems = [], headerBackground = { className: 'bg-white', isLight: true } }) => (
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

Layout.propTypes = {
  header: PropTypes.node,
  navItems: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  headerBackground: PropTypes.shape({
    className: PropTypes.string,
    isLight: PropTypes.bool
  })
};

export default Layout;
