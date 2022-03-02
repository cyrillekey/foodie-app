import { icons, images } from "./";

const myProfile = {
    name: "ByProgrammers",
    profile_image: images.profile,
    address: "No. 88, Jln Padungan, Kuching"
}

const categories = [
    {
        id: 1,
        name: "Fast Food",
        icon: icons.burger
    },
    {
        id: 2,
        name: "Fruit Item",
        icon: icons.cherry
    },
    {
        id: 3,
        name: "Rice Item",
        icon: icons.rice
    }
]

const hamburger = {
    id: 1,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/wrap_sandwich.png")
}
const menu = [
    {
        id: 1,
        name: "Featured",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Nearby you",
        list: [
            hamburger, vegBiryani, wrapSandwich,hotTacos
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 4,
        name: "Newest",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },

]
const allCards = [
    {
        id: 1,
        name: "Apple Pay",
        icon: require("../assets/icons/apple.png")
    },
    {
        id: 2,
        name: "Visa",
        icon: require("../assets/icons/visa.png"),
    },
    {
        id: 3,
        name: "PayPal",
        icon: require("../assets/icons/paypal.png"),
    },
    {
        id: 4,
        name: "Google Pay",
        icon: require("../assets/icons/google.png"),
    },
    {
        id: 5,
        name: "Master Card",
        icon: require("../assets/icons/mastercard.png"),
    },
]
const restaurant=[
    {
        id: 1,
        name: "Hamburger",
        description: "Chicken patty hamburger",
        categories: [1, 2],
        price: 15.99,
        calories: 78,
        isFavourite: true,
        image: require("../assets/dummyData/hamburger.png")
    },
    {
        id: 2,
        name: "Hot Tacos",
        description: "Mexican tortilla & tacos",
        categories: [1, 3],
        price: 10.99,
        calories: 78,
        isFavourite: false,
        image: require("../assets/dummyData/hot_tacos.png")
    }
    ,{

        name: "Veg Biryani",
        description: "Indian Vegetable Biryani",
        categories: [1, 2, 3],
        price: 10.99,
        calories: 78,
        isFavourite: true,
        image: require("../assets/dummyData/veg_biryani.png")
    },
     {
        id: 4,
        name: "Wrap Sandwich",
        description: "Grilled vegetables sandwich",
        categories: [1, 2],
        price: 10.99,
        calories: 78,
        isFavourite: true,
        image: require("../assets/dummyData/wrap_sandwich.png")
    }
]
export default {
    myProfile,
    categories,
    menu,
    allCards,
    restaurant
}