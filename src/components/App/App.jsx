import Layout from '../Layout/Layout';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../../shared/Loading/Loading';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const News = lazy(() => import('../../pages/News/News'));
const FindPet = lazy(() => import('../../pages/FindPet/FindPet'));
const OurFriends = lazy(() => import('../../pages/OurFriends/OurFriends'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<News />} />
          <Route path="/find-pet" element={<FindPet />} />
          <Route path="/friends" element={<OurFriends />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
