import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './pages/home/Login';
import Home from './pages/home/Home';
import ArenaMatching from './pages/arena/ArenaMaching';
import ArenaMain from './pages/arena/ArenaMain';
import RankingMain from './pages/ranking/RankingMain';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* MainLayout을 기반으로 Outlet 사용 */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="arena" element={<ArenaMatching />} />
                    <Route path="arena-test" element={<ArenaMain />} />
                    <Route path="ranking" element={<RankingMain/>} />
                </Route>

                {/* 로그인 페이지는 별도로 라우팅 */}
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
