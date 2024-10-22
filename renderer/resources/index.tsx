import Image from 'next/image';
import sber from './sber.svg';
import sberbank_green from './sberbank_green.svg';
import sberbank_black from './sberbank_black.svg';

const Paths = {
  SBER: sber,
  SBERBANK_BLACK: sberbank_black,
  SBERBANK_GREEN: sberbank_green,
};

type IconsNames = {
  icon: 'SBER' | 'SBERBANK_BLACK' | 'SBERBANK_GREEN';
  value?: number;
};

export default function CustomIcon({ value = 25, icon }: IconsNames) {
  const src = Paths[icon];
  const image_props: {
    src: string;
    height: number;
    width: number;
  } = {
    src,
    height: value,
    width: value,
  };
  return <Image {...image_props} />;
}
