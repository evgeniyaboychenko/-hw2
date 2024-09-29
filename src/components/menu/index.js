import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './style.css';

function Menu({ currenPageId, menuList}) {
  return (
    <nav className = 'Nav'>
      <ul className = 'Nav-List'>
        {
          menuList.map((item, index) => {
            if(item.pageId !== currenPageId) return (
              <li key={index} className = 'Nav-Item'>
                <Link to={item.to} className = 'Nav-Link'>{item.link}</Link>
              </li>)
            else return(
              <li key={index} className = 'Nav-Item'>
                <span className='Nav-Link'>
                  {item.link}
                </span>
              </li>)
          })
        }
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      pageId: PropTypes.string,
      link:  PropTypes.string,
      to: PropTypes.string,
    }),
  ).isRequired,
  currenPageId: PropTypes.string,
};

export default memo(Menu);
