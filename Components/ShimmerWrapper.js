import React from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerWrapper = ({element,style,width,height}) => {
    const ShimmperPlaceHolder = createShimmerPlaceholder(LinearGradient);
  return (
    <ShimmperPlaceHolder
    width={width}
    height={height}
    style={{...style}}
    >
        {element}
    </ShimmperPlaceHolder>
    );
};

export default ShimmerWrapper;
