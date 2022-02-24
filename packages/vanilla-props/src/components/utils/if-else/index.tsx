import React from 'react';

interface IProps {
  if: boolean;
  else?: JSX.Element;
}

export function IfElse(props: IProps & React.PropsWithChildren<IProps>) {
  const { children } = props;
  const ifCondition = props.if;
  const elseElement = props.else;

  return ifCondition ? <>{children}</> : (elseElement || null);
}