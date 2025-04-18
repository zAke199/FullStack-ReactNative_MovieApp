import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Link} from "expo-router";
import {icons} from "@/constants/icons";


const MovieCard = ({id , poster_path , title , vote_average , release_date} : Movie) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold  text-white mt-2" numberOfLines={1}>{title} </Text>
                <View className="flex-row items-center juistify-start gap-x-1">
                    <Image source={icons.star} className="size-4"/>
                    <Text className={"text-xs text-white font-bold uppercase"}>{Math.round(vote_average / 2)}</Text>
                </View>
                <View className="flex-row items-center juistify-between">
                    <Text className={"text-xs text-[#9CA4AB] font-medium mt-1"}>{release_date?.split('-')[0]}</Text>
                         {/*<Text className={"text-xs text-[#9CA4AB] font-medium uppercase"}>MOVIE</Text>*/}
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
