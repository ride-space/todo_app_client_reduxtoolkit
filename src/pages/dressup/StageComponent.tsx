import type Konva from 'konva';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import type { Part } from 'src/pages/dressup/index.page';
import useImage from 'use-image';

const PartImage = ({ part }: { part: Part }) => {
  const [image] = useImage(part.imagePath);
  return (
    <KonvaImage image={image} alt="part" style={{ zIndex: `${part.z}` }} />
  );
};

const LayerComponent = ({ part }: { part: Part[] }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [createImage, setCreateImage] = useState('');

  const process = () => {
    console.log(stageRef);
    const temp = stageRef.current;
    // stageRefの中身(temp )がnullな可能性を考慮してチェック
    if (temp !== null) {
      // dataUrlに、画像データがdata URL(MIME Type + base64文字列)形式で書き込まれる。
      // toDataURLの引数を変更すれば、PNG以外の画像形式への変換も可能
      const dataUrl = temp.toDataURL();
      console.log(dataUrl);
      setCreateImage(dataUrl);
      // これ以降、dataUrlを使った操作(画像保存、画像加工等)を行う
    }
  };
  return (
    <div style={{ margin: '0 auto', maxWidth: '640px', width: '100%' }}>
      <Stage ref={stageRef} width={800} height={700}>
        <Layer key="layer">
          {part.map((p, i) => {
            return <PartImage part={p} key={i} />;
          })}
        </Layer>
      </Stage>
      <button onClick={process}>image</button>
      {createImage ? <Image src={createImage} alt="" /> : null}
    </div>
  );
};

export default LayerComponent;
