import React, { useEffect, useRef } from 'react';
import { Icon } from '../../../Icon';

import { Typography } from '../../../Typography';
import { Blue, Neutral } from '../../../utilities/colors';
import {
  ActivatorSelectContextProps,
  useSelectActivator,
} from './ActivatorContext';
import { StyledSelect, StyledTag, TagsContainer } from './ActivatorStyle';

export interface ActivatorSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  allowMultiple?: boolean;
  value?: string;
  placeholder?: string;
  hasError?: boolean;
  onRemoveTag?({ option }: { option: string }): void;
  width?: number;
  setWidth?: React.Dispatch<(prevState: undefined) => undefined>;
}
export const ActivatorSelect = ({
  placeholder,
  value,
  onClick,
  onRemoveTag,
  ...props
}: ActivatorSelectProps) => {
  const activatorRef = useRef(null);
  const hasValue = !!value;
  const activatorContext = useSelectActivator() as ActivatorSelectContextProps;
  const {
    allowMultiple,
    disabled,
    onSelectClick,
    hasError,
    setWidth,
    selectedValues,
  } = activatorContext;

  useEffect(() => {
    setWidth(activatorRef.current.getBoundingClientRect().width);
  }, [activatorRef, setWidth]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    onSelectClick();
    onClick;
  };

  console.log('disabled', disabled);

  const placeholderMarkup = (
    <Typography variant="body1" color={disabled ? Neutral.B85 : Neutral.B40}>
      {placeholder}
    </Typography>
  );

  const tagsMarkup = () => {
    const hasSelectedValues = selectedValues.length > 0;

    if (!hasSelectedValues) {
      return placeholderMarkup;
    }

    if (hasSelectedValues) {
      return (
        <TagsContainer>
          <StyledTag
            key={`option-${selectedValues[0]}`}
            onRemove={onRemoveTag({ option: selectedValues[0] })}
            textColor={Blue.S99}
          >
            {selectedValues[0]}
          </StyledTag>
          {selectedValues.length > 1 && (
            <Typography
              variant="caption"
              color={disabled ? Neutral.B85 : Neutral.B40}
            >
              ... and {selectedValues.length - 1} more
            </Typography>
          )}
        </TagsContainer>
      );
    }
  };

  return (
    <StyledSelect
      ref={activatorRef}
      data-error={hasError}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {allowMultiple ? (
        tagsMarkup()
      ) : (
        <Typography
          variant="body1"
          color={disabled ? Neutral.B85 : Neutral.B40}
        >
          {hasValue ? value : placeholderMarkup}
        </Typography>
      )}
      <Icon
        height={24}
        name="ri-arrow-m-down-line"
        fill={disabled ? Neutral.B85 : Neutral.B40}
      />
    </StyledSelect>
  );
};
