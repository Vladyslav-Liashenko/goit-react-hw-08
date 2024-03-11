// import { Helmet } from 'react-helmet-async';

export default function DocumentTitle({ children }) {
  return (
    <h2>
      <title>{children}</title>
    </h2>
  );
}
