import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './pages/home/Login';
import Home from './pages/home/Home';
import ArenaMatching from './pages/arena/ArenaMaching';
import ArenaMain from './pages/arena/ArenaMain';
import useAuthStore from './store/useAuthStore';
import { useShallow } from 'zustand/shallow';
import PrivateRoute from './PrivateRoute';

const App = () => {
    const { isAuthenticated } = useAuthStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
        }))
    );

    return (
        <Router>
            <Routes>
                {/* MainLayout을 기반으로 Outlet 사용 */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="arena"
                        element={
                            <PrivateRoute>
                                <ArenaMatching />
                            </PrivateRoute>
                        }
                    />
                    ,
                    <Route
                        path="arena-test"
                        element={
                            <PrivateRoute>
                                <ArenaMain />
                            </PrivateRoute>
                        }
                    />
                    ,
                </Route>

                {/* 로그인 페이지는 별도로 라우팅 */}
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
