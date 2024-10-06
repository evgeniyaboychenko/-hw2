import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import SideLayout from '../side-layout'
import { useLocation} from "react-router-dom";

function PageTop({isAuth, userName,  onExit = ()=> {}, children }) {
  const location = useLocation();

  return (
    <SideLayout side="end">
      {isAuth === "AUTH" ? (
        <div className="PageTop">
        <Link className='PageTop-UserLink' to='/profile'>{userName}</Link>
        <button className = "Button" onClick = {onExit}>Выход</button>
      </div>
      ) :
      (
        <div className="PageTop">
          <Link to='/login' className = "Button" replace state={{ from: location }} >Вход</Link>
        </div>
      )
    }
    </SideLayout>)
  }




//   if(isAuth === "AUTH")
//   return (
//     <div className="PageTop">
//       <Link to='/profile'>{userName}</Link>
//       <button onClick = {onExit}>Выход</button>
//     </div>
//   )
//   return (
//     <div className="PageTop">
//       <Link to='/login'>Вход</Link>
//     </div>
//   )
// }

PageTop.propTypes = {
  isAuth: PropTypes.string,
  userName: PropTypes.string,
  onExit: PropTypes.func,
  // title: PropTypes.node,
  // children: PropTypes.node,
};

export default memo(PageTop);
