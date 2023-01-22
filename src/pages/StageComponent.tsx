import { Image, Layer, Rect, Stage } from 'react-konva';
import { Part } from 'src/pages/imagepagecustom.page';
import useImage from 'use-image';
import { useRef, useState } from 'react';
import Konva from 'konva';

const PartImage = ({ part }: { part: Part }) => {
  const [image] = useImage(part.imagePath);
  return <Image image={image} alt="part" style={{ zIndex: `${part.z}` }} />;
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
    <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <Stage ref={stageRef} width={800} height={700}>
        <Layer key="backgroud">
          {part.map((p, i) => (
            <PartImage part={p} key={i} />
          ))}
        </Layer>
      </Stage>
      <button onClick={process}>image</button>
      {createImage ? <img src={createImage} alt="" /> : null}
    </div>
  );
};

export default LayerComponent;
