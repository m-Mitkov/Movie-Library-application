import { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';

import style from './Navbar.module.css';
import { Button } from '@material-ui/core'
import SeacrhPage from '../SearchPage/SearchPage';

const Navbar = () => {

    const history = useHistory();
    const inputRef = useRef();

    const onClickHandler = () => {
        const searchParam = inputRef.current.value;
        console.log('click');

        history.push({
            pathname: `/search/${searchParam}`,
            state: { searchData: searchParam }
        })
    }

    return (
        <div className={style.navbar}>
            <Link to='/'>
                <span className={style.title}>My Movie Collection</span>
            </Link>

            <form className={style.inputForm}>

                <input type="text" ref={inputRef}
                    className={style.inputData}
                    placeholder="Search by movie title..."
                />

                <Button variant="outlined"
                    color="primary"
                    onClick={onClickHandler}
                >
                    Search</Button>

            </form>
        </div>
    );

}

export default Navbar;