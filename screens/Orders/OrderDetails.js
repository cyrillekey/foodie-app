import { View, Text ,Image,ScrollView} from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES ,dummyData} from '../../constants';
import { Header ,LineDivider} from '../../Components';
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
              size={220}
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
            height:300
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
            <ScrollView
            bounces={true}
            style={{
                padding:SIZES.padding,
                borderTopLeftRadius:30,
                borderTopRightRadius:30,
                backgroundColor:COLORS.white,
            }}
            >
                <Text style={{...FONTS.h3,marginLeft:SIZES.padding}}>Order items</Text>
                {
                    dummyData.menu[1].list.map(item=>(
                        <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.radius
            }}
            >
            <Image
            source={item.image}
            style={{
                width:40,
                height:40,
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
                >{item.name}</Text>
                <Text style={{...FONTS.h3}}>Qty: 4</Text>
            </View>
            </View>
                    ))
                }
            <LineDivider
            lineStyle={{
                marginTop:SIZES.padding
            }}
            />
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.padding,
                marginBottom:SIZES.padding
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
            </ScrollView>
        </View>
    </View>
  );
};

export default OrderDetails;
