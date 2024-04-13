import { Button, ButtonBaseOwnProps, ButtonOwnProps } from '@mui/material';
import { useRouter } from 'next/router';
import Linker from '../Linker';
import { ReactNode } from 'react';

interface NavigationLinkButtonParameters {
  /**
   * @var Путь кнопки обязательно
   */
  path: string;
  /**
   * @var имя или икону обязательно добавить для удобного отображения
   */
  name?: string;
  icon?: ReactNode;
  /**
   * @var доп пропы
   */
  props?: ButtonOwnProps | ButtonBaseOwnProps;
}

export default function NavigationLinkButton({
  name,
  path,
  icon,
  props,
}: NavigationLinkButtonParameters) {
  const currentPath = useRouter().pathname;
  return (
    <>
      <Button
        variant={path === currentPath ? 'outlined' : 'text'}
        id="basic-button"
        color="inherit"
        component={Linker}
        href={`..${path}`}
        {...props}
      >
        {icon ? icon : null}
        {name ? name : null}
      </Button>
    </>
  );
}
