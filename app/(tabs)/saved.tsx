import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native';
import {images} from "@/constants/images";

const Saved = () => {
    return (
        <View className="flex-1 bg-[#030014]">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>
            <View className="flex-1 justify-center items-center z-10">
                <Text className="text-white font-bold text-xl">Nothing saved yet</Text>
            </View>
        </View>
    );
};

export default Saved;

const styles = StyleSheet.create({});
