import * as React from 'react';

import { DrawerContainer, DrawerWrapper } from './DrawerStyle';

const Drawer = ({
  children,
  isOpen,
  onClose,
  position = 'right',
  ...defaultProps
}: Props) => {
  const [firstRenderDone, setFirstRenderDone] = React.useState(false);
  React.useEffect(
    function markFirstRenderAsDone() {
      if (!firstRenderDone) {
        setFirstRenderDone(true);
      }
    },
    [firstRenderDone]
  );
  return (
    <DrawerContainer
      className="aries-drawer"
      data-testid="drawer-container"
      aria-modal="true"
      aria-hidden={isOpen ? 'false' : 'true'}
      open={isOpen}
      onClick={() => onClose()}
    >
      <DrawerWrapper
        className="drawer-contentwrapper"
        role="dialog"
        data-testid="drawer-wrapper"
        open={isOpen}
        firstRenderDone={firstRenderDone}
        position={position}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
        {...defaultProps}
      >
        {children}
      </DrawerWrapper>
    </DrawerContainer>
  );
};

export type DrawerPosition = 'left' | 'right';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: Function;
  position?: DrawerPosition;
}

export default Drawer;
