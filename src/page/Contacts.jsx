import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../components/DocumentTitle';
import { ContactList } from '../components/ContactList/ContactList';
import { ContactForm } from '../components/ContactForm/ContactForm';
import { ContactEditor } from '../components/ContactEditor/ContactEditor';
import { SearchBox } from '../components/SearchBox/SearchBox';
import { fetchContacts } from '../redux/contacts/operations'; 
import { selectIsLoading, selectError } from '../redux/contacts/selectors';

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && !error && <b>Loading...</b>}
      <DocumentTitle><h1>Phonebook</h1></DocumentTitle>
      <ContactEditor />
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactForm />
      <ContactList />
      <SearchBox />
    </>
  );
}
