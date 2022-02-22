/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,Image, TextInput, TouchableOpacity, FlatList
} from 'react-native';
import { COLORS, SIZES,icons, FONTS, dummyData } from '../../constants';
import { HorizontalFoodCard } from '../../Components';

const Home = () => {
    //const [selectedCatId, setselectedCatId] = React.useState(1);
    //const [selectedMenu, setselectedMenu] = React.useState(1);
    const [menu, setmenu] = React.useState([]);
    React.useEffect(()=>{
       setmenu(dummyData.menu[1].list)
        // handleCategoryChange(selectedCatId,selectedMenu)
    },[]);
    // const handleCategoryChange=(selectedCatId,selectedMenu)=>{
    //     let selectedMenut=dummyData.menu.push.find(a=>a.id==selectedMenu);
    //     setmenu(selectedMenut?.list.filter(a => a.categories.includes(selectedCatId)))
    // }
    const  renderSearch=()=>{
        return (
            <View style={{
                flexDirection:'row',
                height:50,
                alignItems:'center',
                marginHorizontal:SIZES.padding,
                marginVertical:SIZES.base,
                paddingHorizontal:SIZES.radius,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2,
            }}>
                <Image
                source={icons.search}
                style={{
                    height:20,
                    width:20,
                    tintColor:COLORS.black,
                }}
                />
                <TextInput
                    style={{
                        flex:1,
                        marginLeft:SIZES.radius,
                        color:'black',
                        ...FONTS.body3,
                    }}
                    placeholder="Search food"
                    placeholderTextColor={COLORS.gray3}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity>
                    <Image
                    source={icons.filter}
                    style={{
                        width:20,
                        height:20,
                        tintColor:COLORS.black,
                    }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    const renderMenuTypes=()=>{
        return (
            <FlatList
            horizontal
            data={dummyData.menu}
            keyExtractor={item=>`${item.id}`}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop:20,
                marginBottom:30,
            }}
            renderItem={({item,index})=>(
                <TouchableOpacity
                    style={{
                        marginLeft:SIZES.padding,
                       // marginRight:index==dummyData.menu.length-1 ? SIZES.padding : 0
                    }}
                    onPress={()=>{}}
                >
                    <Text style=
                    {{
                        ...FONTS.h3,
                        color:COLORS.primary,
                    }}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
            />
        );
    }
    const renderPopularNearYou=()=>{
        return (
                    <FlatList
                    horizontal
                    data={dummyData.categories}
                    key={item=>`${item.id}`}
                    renderItem={({item,index})=>(
                        <TouchableOpacity style={{
                            flexDirection:'row',
                            height:50,
                            marginTop:SIZES.padding,
                            marginLeft:index==0 ?SIZES.padding :SIZES.radius,
                            marginRight:index==dummyData.categories.length-1 ? SIZES.padding :SIZES.radius,
                            paddingHorizontal:1,
                            borderRadius:SIZES.radius,
                            backgroundColor:COLORS.primary,
                        }}>
                            <Image
                                source={item.icon}
                                style={{
                                    marginTop:5,
                                    height:50,
                                    width:50,
                                }
                                }
                            />
                            <Text style={{
                                alignSelf:'center',
                                marginRight:SIZES.base,
                                ...FONTS.h3,
                                color:COLORS.white
                            }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        )}
                    />
        );
    }
    const renderDelivery=()=>{
        return (
            <View style={{
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding
            }}>
                <Text
                style={{
                    ...FONTS.h3,
                    color:COLORS.primary,
                }}
                >
                    Delivery To
                </Text>
                <TouchableOpacity
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.base,
                    alignItems:'center'
                }}
                >
                    <Text style={{...FONTS.h3}}>
                        {dummyData.myProfile.address}
                    </Text>
                    <Image
                    source={icons.down_arrow}
                    style={{
                        height:20,
                        width:20,
                        marginLeft:SIZES.base,
                    }}
                    />
                    </TouchableOpacity>
            </View>
        );
    }
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {renderSearch()}
            <FlatList
                data={menu}
                keyExtractor={(item)=>`${item.id}`}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<View>
                    {renderDelivery()}
                    {renderPopularNearYou()}
                    {renderMenuTypes()}
                </View>}
                renderItem={({item,index})=>{
                    return (
                        <HorizontalFoodCard
                            containerStyle={{
                                height:130,
                                alignItems:'center',
                                marginHorizontal:SIZES.padding,
                                marginBottom:SIZES.radius
                            }}
                            imageStyle={{
                                marginTop:20,
                                height:110,
                                width:110,
                            }}
                            item={item}
                            onPress={()=>{}}
                        />
                    );
                }}
            />
        </View>
    )
}

export default Home;