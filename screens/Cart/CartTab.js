import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { FooterTotal, Header, Iconlabel, StepperIncrement, TextIconButton } from '../../Components';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../../constants';

const CartTab = ({navigation}) => {
    const [cartList, setCartList] = React.useState(dummyData.menu)
    return (
        <View
        style={{
            flex:1,
            backgroundColor:COLORS.white
        }}
        >
            <Header
            containerStye={{
            height:50,
            marginTop:10,
            alignItems:'center',
            paddingHorizontal:SIZES.padding,

            }}
            title={"Cart"}
            isBackPresent={true}
            navigation={navigation}
            />
            <SwipeListView
            data={cartList}
            keyExtractor={item=>`${item.id}`}
            contentContainerStyle={{
                marginTop:SIZES.radius,
                paddingHorizontal:SIZES.padding,
                paddingBottom:SIZES.padding*2
            }}
            disableRightSwipe
            rightOpenValue={-75}
            renderHiddenItem={(data,roadMap)=>(
                <TextIconButton
                iconRight={icons.setting}
                containerStyle={{
                    flex:1,
                    justifyContent:'flex-end',
                    backgroundColor:COLORS.primary,
                    ...styles.cartItemContainer
                }}
                iconStyle={{
                    marginRight:10,
                    tintColor:COLORS.white
                }}
                onPress={()=>{
                    console.log("removes")
                }}
                />
            )}
            renderItem={(data,index)=>(
                <View
                style={{
                    height:80,
                    backgroundColor:COLORS.lightGray2,
                    ...styles.cartItemContainer
                }}
                >
                    <View
                    style={{
                        width:90,
                        height:80,
                        marginLeft:-10
                    }}
                    >
                        <Image
                        source={dummyData.categories[0].icon}
                        resizeMode="contain"
                        style={{
                            width:'100%',
                            height:'100%',
                            position:'absolute',
                            top:10
                        }}
                        />
                    </View>
                    <View
                    style={{
                        flex:1
                    }}
                    >
                        <Text
                        style={{...FONTS.body3}}
                        >{data.item.name}</Text>
                        <Text style={{
                            ...FONTS.h3,
                            color:COLORS.primary
                        }} >$ {data.index}</Text>
                    </View>
                    <StepperIncrement
                    containerStyle={{
                        height:50,
                        width:125,
                        backgroundColor:COLORS.white
                    }}
                    />
                </View>
            )}
            />
            <FooterTotal
            subTotal={100}
            shippingFee={120}
            total={1250}
            onPress={()=>{
                navigation.navigate('payment')
            }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    cartItemContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:SIZES.radius,
        paddingHorizontal:SIZES.radius,
        borderRadius:SIZES.radius
    }
});
export default CartTab