import React, { useState } from 'react';
import QuizHeader from '../../components/quiz/QuizHeader';
import QuizContent from '../../components/quiz/QuizContent';
import AnswerInput from '../../components/quiz/AnswerInput';
import QuizAvartar from '../../components/quiz/QuizAvartar';

const ArenaMain = () => {
    const tags = ['국내주식', '투자'];
    const images = [
        'https://webchart.thinkpool.com/2022Mobile/Stock1Day/A005930.png',
        'https://dimg.donga.com/wps/NEWS/IMAGE/2025/01/08/130814617.1.jpg',
        'https://blog.kakaocdn.net/dn/bUnwZW/btrgvTEuJ0u/zXAc7VDKWakfo47mL8XAa0/img.jpg',
        'https://image.fnnews.com/resource/media/image/2024/11/18/202411182338292936_l.jpg',
    ];
    const content =
        '삼성전자는 2024년 하반기부터 메모리 반도체 수요 회복과 함께 AI 반도체 사업 확장을 통해 성장 가능성을 기대하고 있습니다. 하지만 글로벌 경기 둔화와 경쟁 심화로 인해 불확실성도 상존합니다. 이러한 상황에서 삼성전자의 주가에 영향을 미칠 주요 요인으로는 기술 혁신, 원자재 가격, 그리고 환율 변동 등이 있습니다. 삼성전자의 주가가 앞으로 상승할 가능성이 높다고 보는지, 혹은 하락할 가능성이 높다고 보는지, 그 이유를 사례를 들어 서술하세요.';
    const references = [
        {
            referType: '뉴스',
            referText: '"악재란 악재 다 반영됐다"… 삼성전자 주가 반등 기대감',
            referLink: 'https://daisyui.com/',
        },
        {
            referType: '뉴스',
            referText: '계속 무너져 내려가는 삼성전자',
            referLink: 'https://daisyui.com/',
        },
        {
            referType: '차트',
            referText: '삼성전자 차트 - 네이버페이 증권',
            referLink: 'https://daisyui.com/',
        },
        {
            referType: '재무제표',
            referText: '삼성전자 재무제표 - 네이버페이 증권',
            referLink: 'https://daisyui.com/',
        },
    ];

    return (
        <div className="px-[8rem]">
            <QuizHeader title={'삼성 전자의 전망을 평가해라!'} tags={tags} count={180} />
            <QuizContent content={content} images={images} references={references} />
            <QuizAvartar />
            <div className="text-center h-200">스크롤 테스트</div>
            <div className="flex justify-center items-center">
                <AnswerInput />
            </div>
        </div>
    );
};

export default ArenaMain;
