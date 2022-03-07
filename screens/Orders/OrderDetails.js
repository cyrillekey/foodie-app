import { View, Text ,Image} from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { Header } from '../../Components';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';

const OrderDetails = ({navigation}) => {
    console.log(navigation)
  return (
    <View
    style={{
        flex:1,
        backgroundColor:COLORS.white
    }}
    ><Header
            title="#4525445"
            containerStye={{
                marginTop:SIZES.padding,
                paddingHorizontal:SIZES.padding
            }}
            isBackPresent={true}
            isCartpresent={false}
            navigation={navigation}
        />
        <View
        style={{
            marginTop:SIZES.padding * 2,
            borderRadius:SIZES.radius,
            justifyContent:'center',
            alignItems:'center',
        }}
        >
            <QRCode
              value='12545'
              size={250}
            />
            <Text
            style={{
                ...FONTS.h3,
                textAlign:'center',
                marginTop:SIZES.padding
            }}
            >Scan to confirm Order Received</Text>
        </View>
        <View
        style={{
            position:"absolute",
            bottom:0,
            width:'100%',
        }}
        >
            <LinearGradient
                start={{x:0,y:0}}
                end={{x:0,y:1}}
                colors={[
                    COLORS.transparent,
                    COLORS.lightGray1
                ]}
                style={{
                    position:'absolute',
                    top:-20,
                    left:0,
                    right:0,
                    height:50,
                }}
            />
            <View
            style={{
                padding:SIZES.padding,
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                backgroundColor:COLORS.white,
            }}
            >
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
            }}
            >
            <Image
            source={icons.clock}
            style={{
                width:40,
                height:40,
                tintColor:COLORS.black
            }}
            />
            <View
                style={{
                    marginLeft:SIZES.padding
                }}
            >
                <Text
                style={{
                    ...FONTS.body4,
                    color:COLORS.gray,
                }}
                >Delivery Time</Text>
                <Text style={{...FONTS.h3}}>8 mins</Text>
            </View>
            </View>
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.padding
            }}
            >
            <Image
            source={icons.location}
            style={{
                width:40,
                height:40,
                tintColor:COLORS.black
            }}
            />
            <View
                style={{
                    marginLeft:SIZES.padding
                }}
            >
                <Text
                style={{
                    ...FONTS.body4,
                    color:COLORS.gray
                }}
                >Delivery Time</Text>
                <Text style={{...FONTS.h3}}>8 mins</Text>
            </View>
            </View>
            </View>
        </View>
    </View>
  );
};

export default OrderDetails;
