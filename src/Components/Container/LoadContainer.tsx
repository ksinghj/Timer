import React from 'react';
import {ContainerProps} from './types';
import {DataLoadStatus} from '../../Services/Utils/types';
import {Container} from './Container';

type Props<TData> = ContainerProps & {
  dataLoad: DataLoadStatus<TData>;
  Loading?: React.FC;
  Error?: React.FC;
  children: (data: TData) => React.ReactNode;
};

export function LoadContainer<TData>(props: Props<TData>) {
  const {dataLoad, Error, Loading, children, ...rest} = props;

  if (dataLoad.status === 'NotLoaded' || dataLoad.status === 'Loading') {
    return Loading ? <Loading /> : null;
  }

  if (dataLoad.status === 'Failed') {
    return Error ? <Error /> : null;
  }

  return <Container {...rest}>{children(dataLoad.data!)}</Container>;
}
