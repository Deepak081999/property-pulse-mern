import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                {/* put specific static routes before the dynamic :id to prevent the parameter from
                    greedily matching words like "search-results" */}
                <Route path="/properties/search-results" element={<SearchResultsPage />} />
                <Route path="/properties/add" element={<PrivateRoute><AddPropertyPage /></PrivateRoute>} />
                <Route path="/properties/edit/:id" element={<PrivateRoute><EditPropertyPage /></PrivateRoute>} />
                <Route path="/properties/saved" element={<PrivateRoute><SavedPropertiesPage /></PrivateRoute>} />
                {/* now the catch-all dynamic route goes last */}
                <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Layout>
    );
}

export default App;