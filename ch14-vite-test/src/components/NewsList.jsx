import styled from 'styled-components';
import NewsItem from './NewsItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
    //추가
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);
    //추가
    // 마운트시, 최초에 한번만 데이터를 받아오자, 함수형 컴포넌트 
    // 생명주기. 
    useEffect(() => {
        // async를 사용하는 함수 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                // 방법1, 전체기사에 대한 데이터 받기. 
                // const response = await axios.get(
                //     'https://newsapi.org/v2/top-headlines?country=us&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f'
                // );
                // 방법2, 각 카테고리별로 받기.
                //추가
                const query = category === 'all' ? '' : `&category=${category}`;
                //추가       
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        // 함수를 이용해야. 
        fetchData();
        //category 변경시 마다 , useEffect 함수가 동작함.
    }, [category]);

    //추가
    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    //추가
    // 아직 articles 값이 설정되지 않았을 때
    if (!articles) {
        // 데이터가 받아 온게 없으면 , 화면에 그리지 않는다.
        return null;
    }

    // articles 값이 유효할 때
    return (
        <NewsListBlock>
            {/* 추가 */}
            {/* articles = [{기사1},{기사2},{기사3}...] */}
            {articles.map((article) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;