const Sidebar = () => {
    return (
      <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
        {/* 상단 로고 */}
        <div className="p-4 text-2xl font-bold border-b border-gray-700">로고</div>
        
        {/* 메뉴 */}
        <nav className="flex-grow">
          <ul className="p-4 space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">홈</li>
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">연습모드</li>
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">아레나</li>
            <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">랭킹</li>
          </ul>
        </nav>
        
        {/* 하단 푸터 */}
        <div className="p-4 border-t border-gray-700">© 2025 YourApp</div>
      </div>
    );
  };
  
  export default Sidebar;
  