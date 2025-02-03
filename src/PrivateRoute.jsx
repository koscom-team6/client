import React, { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useAuthStore from './store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore(
        useShallow((state) => ({
            isAuthenticated: state.isAuthenticated,
        }))
    );

    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <div role="alert" className="alert alert-warning w-92 h-20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <div>
                        <h3 className="font-bold">로그인 필요</h3>
                        <div className="text-xs">해당 페이지는 로그인이 필요합니다</div>
                    </div>
                    <button className="btn btn-sm" onClick={() => navigate('/')}>
                        홈으로 이동
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default PrivateRoute;
