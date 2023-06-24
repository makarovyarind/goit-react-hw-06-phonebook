import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../../redux/contactsSlice';

export function Filter () {

    const filterName = useSelector((state) => state.contacts.filter);
    const dispatch = useDispatch();

    const changeFilter = (e) => {
        dispatch(setFilter(e.currentTarget.value));
      };

    return (
        <label>
            <input
            type="text"
            value={filterName}
            onChange={changeFilter}
            >
            </input>
        </label>
    );
};