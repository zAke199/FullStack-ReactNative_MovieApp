import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const {
        data: movies,
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(
        () =>
            fetchMovies({
                query: searchQuery,
            }),
        false
    );

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                const res = await loadMovies();
                console.log("Fetched Movies:", res);
                // @ts-ignore
                if (res?.length > 0 && res?.[0]) {
                    await updateSearchCount(searchQuery, res[0]);
                }
            } else {
                reset();
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // @ts-ignore
    return (
        <View className="flex-1 bg-[#030014]">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item, index) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <Image source={icons.logo2} className="w-24 h-20 mt-20 mx-auto" />
                        <SearchBar
                            placeholder="Search for a Movie"
                            value={searchQuery}
                            onChangeText={(text: string) => setSearchQuery(text)}
                        />
                        {loading && (
                            <ActivityIndicator size="large" color="#0000ff" className="my-3" />
                        )}
                        {error && (
                            <Text className="text-red-500 px-5 my-3">Error:{error.message}</Text>
                        )}
                        {!loading && !error && searchQuery.trim() && (movies?.length ?? 0) > 0 && (
                            <Text className="text-xl text-white font-bold">
                                Search Results for {""}
                                <Text className="text-purple-400 size-xl text-bold">
                                    {searchQuery}
                                </Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-xl text-white text-center font-bold">
                                {searchQuery.trim() ? "No Movies Found" : "Search For a Movie"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({});
