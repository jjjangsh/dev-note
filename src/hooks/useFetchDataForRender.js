import { useEffect, useState } from 'react';

/** 렌더링을 위해 필요한 비동기 함수의 결과를 반환
 * @param {function} fetchFunction - 데이터를 fetch하는 async 함수
 * @param param - fetchFunction에 전달해야하는 인자
 */
const useFetchDataForRender = (fetchFunction, param) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const fetchData = await fetchFunction(param);

      if (isMounted) {
        setData(fetchData);
        setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading };
};

export default useFetchDataForRender;
