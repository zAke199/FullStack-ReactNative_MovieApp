import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import {icons} from "@/constants/icons";

interface MovieInfoProps {
    label : string;
    value? : string | null ;
}

const MovieInfo = ({label , value} : MovieInfoProps)=> (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-[#9CA4AB] font-normal text-sm">{label}</Text>
        <Text className="text-white font-bold text-sm mt-2">{value || 'N/A'}</Text>
    </View>
)

const MovieDetails = () => {
    const {id} = useLocalSearchParams();
    const {data : movie , loading} = useFetch(()=> fetchMovieDetails(id as string))
    return (
        <View className="bg-[#030014] flex-1">
            <ScrollView contentContainerStyle={{
                paddingBottom: 80,
            }}>
                <View>
                    <Image source={{uri : `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}} className="w-full h-[550px]" resizeMode="stretch" />
                </View>
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-[#9CA4AB] text-sm">{movie?.release_date?.split('-')[0]}</Text>
                        <Text className="text-[#9CA4AB] text-sm">{movie?.runtime}mins</Text>
                    </View>
                    <View className="flex-row items-center bg-[#221F3D] px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4"></Image>
                        <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>
                        <Text className="text-[#9CA4AB] text-sm">({movie?.vote_count}) Votes</Text>
                    </View>
                    <MovieInfo label="Overview" value={movie?.overview}/>
                    <MovieInfo label="Genres" value={movie?.genres?.map((g)=> g.name).join(' - ') || 'N/A'}/>
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo label="Budget" value={`$${(movie?.budget / 1_000_000).toFixed(2)} Million      `}/>
                        <MovieInfo label="Revenue" value={`$${(movie?.revenue / 1_000_000).toFixed(2)} Million`}/>
                    </View>
                    <MovieInfo label="Production Companies" value={movie?.production_companies.map((c)=> c.name).join(' - ') || 'N/A'}/>
                </View>
            </ScrollView>
            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-[#AB8BFF] rounded-lg py-3.5 flex flex-row items-center justify-center z-50" onPress={router.back}>
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff"/>
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({});
