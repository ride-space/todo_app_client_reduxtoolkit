import type { CustomNextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { AppLayout } from 'src/layout';
import { v4 as uuidv4 } from 'uuid';

const LayerComponent = dynamic(
  () => {
    return import('src/pages/dressup/StageComponent');
  },
  {
    ssr: false,
  },
);

const PARTS = [
  {
    id: uuidv4(),
    imagePath: '/assets/face1.png',
    name: 'face',
    z: 1,
  },
  {
    id: uuidv4(),

    imagePath: '/assets/eye1.png',
    name: 'eye1',
    z: 2,
  },
  {
    id: uuidv4(),

    imagePath: '/assets/mouth1.png',
    name: 'mouth1',
    z: 2,
  },
  {
    id: uuidv4(),

    imagePath: '/assets/nose1.png',
    name: 'nose1',
    z: 2,
  },
  {
    id: uuidv4(),

    imagePath: '/assets/glasses1.png',
    name: 'glasses1',
    z: 3,
  },
] as Part[];


export type Part = {
  id: string;
  imagePath: string;
  name: string;
  z: number;
};


const DressUp: CustomNextPage = () => {
  const [stageParts, setStageParts] = useState<Part[]>([]);

  return (
    <div style={{ margin: '0 auto', maxWidth: '640px', width: '100%' }}>
      <LayerComponent part={stageParts} />

      {/*パーツ選択エリア*/}
      <div>
        {PARTS.map((p, i) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

DressUp.getLayout = AppLayout;

export default DressUp;
