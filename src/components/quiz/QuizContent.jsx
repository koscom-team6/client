import React from 'react';

/**
 * 퀴즈 콘텐츠
 * @param {string} images 이미지 (1~4개까지)
 * @param {string} content 콘텐츠 텍스트
 * @param {Reference} reference 참고
 */
/**
 * 참고사항 객체
 * @typedef {Object} Reference
 * @property {string} referType 참고사항 타입
 * @property {string} referLink 참고사항 링크
 * @property {string} referTitle 참고사항 이름
 */

const QuizContent = ({ images, content, references }) => {
    return (
        <div className="mb-10 px-3">
            <QuizImageContainer images={images} />
            <p className="text-base my-8">{content}</p>
            <div>
                <h3 className="text-xl font-bold ">참고</h3>
                <p className="text-sm py-1">아래의 정보를 참고하거나, 직접 검색을 통해 문제를 해결하세요!</p>
                <ul className="list-disc ml-6">
                    {references ? (
                        references.map((r, i) => (
                            <ReferenceListItem
                                key={i}
                                referType={r.referType}
                                referLink={r.referLink}
                                referText={r.referText}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            </div>
        </div>
    );
};

const QuizImageContainer = ({ images }) => {
    return (
        <div className="flex gap-4">
            {images ? images.map((image, i) => <QuizImage key={i} image={image} />) : <></>}
        </div>
    );
};

const QuizImage = ({ image }) => {
    return (
        <div className="flex-1 h-80">
            <img className="w-full h-full object-cover rounded-lg shadow-lg" src={image} />
        </div>
    );
};

const ReferenceListItem = ({ referType, referText, referLink }) => {
    return (
        <li>
            <span className="inline-flex">
                <p className="pr-2">{``}</p>
                <a href={referLink} target="_blank" className="text-accent hover:text-[#8C00FE] visited:text-[#390067]">
                    {referText}
                </a>
            </span>
        </li>
    );
};

export default QuizContent;
