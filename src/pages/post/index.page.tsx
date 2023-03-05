// import { GetStaticProps } from 'next';
// import { WrapperProps } from 'next-redux-wrapper';
import type { ComponentProps } from 'react';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { PostType, useGetPostsQuery } from 'src/pages/service/serverApi';

type postsType = {
  category: string;
  title: string;
};

const posts: postsType[] = [
  {
    category: 'React',
    title: 'useStateの使い方',
  },
  {
    category: 'Laravel',
    title: 'LaravelのMVCモデルについて',
  },
  {
    category: 'Web',
    title: '同一オリジンポリシーとCORS',
  },
  {
    category: 'React',
    title: 'useEffectの使い方',
  },
];

const Post = () => {
  const [showPosts, setShowPosts] = useState(posts);
  const [inputValue, setInputValue] = useState("");

  // 検索欄への入力値をハンドリング
  const handleInputChange: ComponentProps<"input">["onChange"] = (e) => {
    setInputValue(e.currentTarget.value);
    search(e.currentTarget.value);
  };

  // 検索欄への入力値での絞り込み
  const search = (value: string) => {
    // 検索欄への入力が空の場合は早期return
    if (value === '') {
      setShowPosts(posts);
      return;
    }

    const serchedPosts = posts.filter((post) => {
      return (
        Object.values(post).filter((item) => {
          return (
            item !== undefined &&
            item !== null &&
            item.toUpperCase().indexOf(value.toUpperCase()) !== -1
          );
        }).length > 0
      );
    });

    setShowPosts(serchedPosts);
  };
  return (
    <div className="App">
      <h1>記事一覧</h1>

      {/* フリーキーワード検索フォーム */}
      <div>
        <h4>Search</h4>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>

      {/* 記事一覧表示 */}
      {showPosts.map((post, index) => {
        return (
          <div key={post.title}>
            <p>
              {index + 1}. {post.title}
            </p>
            <p>category：{post.category}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Post;


// type Props = {
//   submit: () => void;
// }

// export const getStaticProps:GetStaticProps<WrapperProps> = async () => {
//   const dispatch = useDispatch()
//   dispatch(getPokemonByName.initiate(name));


//   return {
//     props: {
//       articles: data,
//     },
//   };
// };
