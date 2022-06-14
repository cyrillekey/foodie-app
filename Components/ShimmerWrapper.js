import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerWrapper = ({element,style,width}) => {
    const ShimmperPlaceHolder = createShimmerPlaceholder(LinearGradient);
  return (
    <ShimmperPlaceHolder
    width={width}
    style={{...style}}
    >
        {element}
    </ShimmperPlaceHolder>
    );
};

export default ShimmerWrapper;
