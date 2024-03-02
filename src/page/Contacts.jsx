import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../components/DocumentTitle';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { TaskEditor } from '../components/TaskEditor/TaskEditor';
import { SearchBox } from './SearchBox/SearchBox';
import { fetchTasks } from '../redux/tasks/operations';
import { selectIsLoading, selectError } from '../redux/contacts/selectors';

export default function Tasks() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      {isLoading && !error && <b>Loading...</b>}
      <DocumentTitle><h1>Phonebook</h1></DocumentTitle>
      <TaskEditor />
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactForm />
      <ContactList />
      <SearchBox />
    </>
  );
}
