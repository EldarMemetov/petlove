import clsx from 'clsx';
import s from './NotFoundPage.module.scss';
import Container from '../../shared/container/Container';

export default function NotFoundPage() {
  const containerClass = clsx('mainContainer', s.errorContainer);

  return (
    <Container>
      <div className={containerClass}>
        <h1>404 Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </Container>
  );
}
