import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { images } from "@/constants/images";
import { icons } from "@/constants/icons"; // optional if you have a user icon or settings icon

const Profile = () => {
    return (
        <View className="flex-1 bg-[#030014]">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>
            <View className="flex-1 justify-center items-center px-6">
                <Image
                    source={icons.person}
                    className="w-28 h-28 rounded-full border-4 border-purple-500 mb-4"
                />
                <Text className="text-white text-2xl font-bold mb-1">Movie App User</Text>
                <Text className="text-purple-400 mb-6">@beast45</Text>
                <View className="flex-row gap-10 mb-8">
                    <View className="items-center">
                        <Text className="text-white text-lg font-bold">48</Text>
                        <Text className="text-gray-400">Watchlist</Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-white text-lg font-bold">12</Text>
                        <Text className="text-gray-400">Favorites</Text>
                    </View>
                </View>
                <TouchableOpacity className="bg-purple-600 px-6 py-3 rounded-2xl">
                    <Text className="text-white font-semibold text-base">
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Profile;
