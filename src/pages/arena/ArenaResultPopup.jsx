import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { ReactComponent as KoStarter } from '../../assets/KoStarter.svg';

const ArenaResultPopup = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="wrapper bg-base-200 h-screen p-12">
            <div className="flex items-center justify-center mb-12 gap-4">
                <Logo className="w-12" />
                <KoStarter className="w-44" />
            </div>
            <h1 className="text-4xl font-bold">{searchParams.get('title')}</h1>
            <div className="pt-4">
                <h2 className="text-2xl font-bold">{searchParams.get('user')}의 답변</h2>
                <div>{searchParams.get('answer')}</div>
            </div>
            <div className="pt-4">
                <h2 className="text-2xl font-bold">AI 피드백</h2>
                <div>{searchParams.get('feedback')}</div>
            </div>
        </div>
    );
};

export default ArenaResultPopup;
