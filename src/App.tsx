import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Aboutus from './pages/Aboutus';
import Latest from './pages/latest';
import Posters from './pages/posters';
import WandD from './pages/w&d';
import WorkWithUs from './pages/work-with-us';
import Magazine from './pages/magazine';
import Stores from './pages/stores';
import Register from './pages/register';
import ContactUs from './pages/contact-us';
import Login from './pages/login';
import Asia from './pages/continents/asia';
import Africa from './pages/continents/africa';
import Europe from './pages/continents/europe';
import NorthAmerica from './pages/continents/northAmerica';
import SouthAmerica from './pages/continents/southAmerica';
import Australia from './pages/continents/australia';
import Continent from './pages/Continent';
import Podcast from './pages/podcast';
import StoresCountryCategoryPage from './pages/StoresCountryCategoryPage';
import WandDCountryCategoryPage from './pages/WandDCountryCategoryPage';
import InstoreVideo from './pages/instore-video';
import AdminDashboard from './pages/admin/dashboard';
import CategoriesPage from './pages/admin/AdminCategories';
import AdminAddStore from './pages/admin/AdminStores';
import AdminAds from './pages/admin/AdminAds';
import AdminNews from './pages/admin/AdminNews';
import AdminProductPage from './pages/admin/AdminProduct';
import DynamicCat from './pages/dynamicCat';
import AdminVideo from './pages/admin/AdminVideos';
import AdminStoreWindow from './pages/admin/AdminStoreWindow';
import AdminNewsLetter from './pages/admin/AdminNewsletter';
import NewsletterPage from './pages/latestPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/:stores/:category/africa" element={<Africa />} />
        <Route path="/:stores/:category" element={<Continent />} />
        <Route path="/:stores/:category/asia" element={<Asia />} />
        <Route path="/:stores/:category/europe" element={<Europe />} />
        <Route path="/:stores/:category/north-america" element={<NorthAmerica />} />
        <Route path="/:stores/:category/south-america" element={<SouthAmerica />} />
        <Route path="/:stores/:category/australia-and-oceania" element={<Australia />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/:category" element={<DynamicCat />} />
        <Route path="/instore-video" element={<InstoreVideo />} />
        <Route path="/posters" element={<Posters />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/login" element={<Login />} />
        <Route path="/WandD" element={<WandD />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="/WandD/:category/:continent/:country" element={<WandDCountryCategoryPage/>} />
        <Route path="/stores/:category/:continent/:country" element={<StoresCountryCategoryPage/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/stores" element={<AdminAddStore/>} />
        <Route path="/admin/categories" element={<CategoriesPage/>} />
        <Route path="/admin/ads" element={<AdminAds/>} />
        <Route path="/admin/latest" element={<AdminNews/>} />
        <Route path="/admin/latest/:id" element={<NewsletterPage/>} />
        <Route path="/admin/products" element={<AdminProductPage/>} />
        <Route path="/admin/videos" element={<AdminVideo/>} />
        <Route path="/admin/store-window" element={<AdminStoreWindow/>} />
        <Route path="/admin/newsletter" element={<AdminNewsLetter/>} />
      </Routes>
    </Router>
  );
};

export default App;