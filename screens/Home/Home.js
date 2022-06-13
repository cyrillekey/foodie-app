/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert,
} from 'react-native';
import { COLORS, SIZES,icons, FONTS, dummyData } from '../../constants';
import { HorizontalFoodCard } from '../../Components';
import { useSelector,useDispatch } from 'react-redux';
import { getAddressName } from '../../constants/util';
import axios  from 'axios';
import { addProducts, saveCategory } from '../../stores/products/productActions';

const Home = (navigation) => {
    const menu = useSelector(state=>state.productReducer.products);
    const address = useSelector(state=>state.userReducer.address);
    const [form,setForm] = React.useState(<ActivityIndicator/>);
    const categories = useSelector(state=>state.productReducer.categories);
    const dispatch = useDispatch();
    const [category,setCategory] = React.useState(0);
    getAddressName(address.latitude,address.longitude,setForm);
    React.useEffect(()=>{
        let current=0;
        axios.get('https://foodieback.herokuapp.com/get-all-categories').then((result) => {
            if (result.status === 200){
                current = result.data[0].cat_id;
            setCategory(current);
            dispatch(saveCategory({categories:result.data}));
            fetchFood(current);
            }
        }).catch((err) => {
            console.log(err);
        });
        // eslint-disable-next-line
    },[dispatch]);
    const fetchFood = (x)=>{
        axios.get(`https://foodieback.herokuapp.com/food-by-category/${x}`).then(response=>{
            if (response.status === 200){
            dispatch(addProducts({food:response.data}));
            }
        }).catch(error=>{
            console.log(error);
            Alert.alert('Error','Something went horribly wrong trying to fetch food');
        }
        );
    };
    const  renderSearch = ()=>{
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
        );
    };
    const renderMenuTypes = ()=>{
        return (
            <FlatList
            horizontal
            data={dummyData.menu}
            keyExtractor={item=>`${item.id}`}
            showsVerticalScrollIndicator={false}
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
                    onPress={()=>{
                    }}
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
    };
    const renderPopularNearYou = ()=>{
        return (
                    <FlatList
                    horizontal
                    data={categories}
                    key={item=>`${item.cat_id}`}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index})=>(
                        <TouchableOpacity
                        onPress={()=>{
                            fetchFood(item.cat_id);
                            setCategory(item.cat_id);
                        }}
                        style={{
                            flexDirection:'row',
                            height:50,
                            marginTop:SIZES.padding,
                            marginLeft:index  === 0 ? SIZES.padding : SIZES.radius,
                            marginRight:index === dummyData.categories.length - 1 ? SIZES.padding : SIZES.radius,
                            paddingHorizontal:1,
                            borderRadius:SIZES.radius,
                            backgroundColor:COLORS.lightGray2,
                        }}>
                            <Image
                                source={{uri:item.cat_icon}}
                                style={{
                                    margin:5,
                                    height:40,
                                    width:40,
                                    borderRadius:25,
                                }
                                }
                            />
                            <Text style={{
                                alignSelf:'center',
                                marginRight:SIZES.base,
                                ...FONTS.h3,
                                color:category == item.cat_id ? COLORS.primary : COLORS.black,
                            }}>
                                {item.cat_name}
                            </Text>
                        </TouchableOpacity>
                        )}
                    />
        );
    };
    const renderDelivery = ()=>{
        return (
            <TouchableOpacity style={{
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding,
            }}
            onPress={()=>navigation.navigate('pickAddress')}
            >
                <View
                style={{
                    flexDirection:'row',
                }}
                >
                <Text
                style={{
                    ...FONTS.h3,
                    color:COLORS.primary,
                }}
                >
                    Delivery To
                </Text>
                <Image
                    source={icons.down_arrow}
                    style={{
                        height:20,
                        width:20,
                        marginLeft:SIZES.base,
                    }}
                    />
                </View>
                <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.base,
                    alignItems:'center',
                }}
                >
                    <Text style={{...FONTS.h3}}>
                        {form}
                    </Text>
                    </View>
            </TouchableOpacity>
        );
    };
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {renderSearch()}
            <FlatList
                data={menu}
                keyExtractor={(item)=>`${item.food_id}`}
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
                                marginBottom:SIZES.radius,
                            }}
                            imageStyle={{
                                height:110,
                                width:110,
                                borderRadius:50,
                                marginRight:10,
                                marginLeft:5,

                            }}
                            item={item}
                            onPress={()=>{
                                //console.log(navigation)
                                navigation.navigate('fooddetails',{
                                    id:item.food_id,
                                });
                            }}
                        />
                    );
                }}
            />
        </View>
    );
};

export default Home;
