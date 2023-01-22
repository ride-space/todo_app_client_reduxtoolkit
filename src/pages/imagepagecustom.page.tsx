import type { CustomNextPage } from 'next';
import { AppLayout } from 'src/layout';
import { useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

import dynamic from 'next/dynamic';
import Image from 'next/image';
const LayerComponent  = dynamic(() => import('src/pages/StageComponent'), {
  ssr: false,
});
// import Konva from "konva";
// import { Image, Layer, Rect, Stage } from 'react-konva';
// import { LayerComponent } from 'src/pages/StageComponent';

// 選択可能なカテゴリ
// const Category = {
//   Face: 'face',
//   Eye: 'eye',
//   Glasses: 'glasses',
//   Nose: 'nose',
//   Mouth: 'mouth',
// } as const;

// 着せ替えパーツ定義
const PARTS = [
  {
    id: uuidv4(),
    name: 'face',
    imagePath: '/assets/face1.png',
    z: 1,
  },
  {
    id: uuidv4(),
    name: 'eye1',

    imagePath: '/assets/eye1.png',
    z: 2,
  },
  {
    id: uuidv4(),
    name: 'mouth1',

    imagePath: '/assets/mouth1.png',
    z: 2,
  },
  {
    id: uuidv4(),
    name: 'nose1',

    imagePath: '/assets/nose1.png',
    z: 2,
  },
  {
    id: uuidv4(),
    name: 'glasses1',

    imagePath: '/assets/glasses1.png',
    z: 3,
  },
] as Part[];

// type Category = typeof Category[keyof typeof Category];

// 着せ替えのパーツの型
export type Part = {
  id: string;
  name: string;
  imagePath: string;
  z: number;
};

// const PartImage = ({ part }: { part: Part }) => {
//   const [image] = useImage(part.imagePath);
//   return <Image image={image} z={part.z} alt="part" />;
// };

const ImagePageCustom: CustomNextPage = () => {
  const [stageParts, setStageParts] = useState<Part[]>([]);


  return (
    <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <LayerComponent part={stageParts}/>

      {/*パーツ選択エリア*/}
      <div>
        {PARTS.map((p, i) => (
          <div key={i}>
            <h2>{p.name}</h2>
            <Image
              key={i}
              alt="part"
              src={p.imagePath}
              width={100}
              height={100}
              onClick={() => {
                setStageParts([...stageParts, { ...p }]);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ImagePageCustom.getLayout = AppLayout;

export default ImagePageCustom;
