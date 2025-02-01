import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './pages/home/Login';
import Home from './pages/home/Home';
import WebSocketTest from './pages/arena/WebSockerTest';
import ArenaMain from './pages/arena/ArenaMain';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* MainLayout을 기반으로 Outlet 사용 */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="arena" element={<WebSocketTest />} />
                    <Route path="arena-test" element={<ArenaMain />} />
                </Route>

                {/* 로그인 페이지는 별도로 라우팅 */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
