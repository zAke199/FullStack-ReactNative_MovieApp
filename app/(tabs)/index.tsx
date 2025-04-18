import React, { useState, useEffect } from "react";
import { Image, Text, View, ActivityIndicator, FlatList } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
    const router = useRouter();

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMovies = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const newMovies = await fetchMovies({ query: "", page });
            if (newMovies.length === 0) {
                setHasMore(false);
            } else {
                setMovies(prev => [...prev, ...newMovies]);
            }
        } catch (err) {
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, [page]);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const uniqueTrendingMovies = trendingMovies?.filter(
        (movie, index, self) =>
            index === self.findIndex((m) => m.movie_id === movie.movie_id)
    );

    if (trendingLoading && page === 1 && movies.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-[#030014]">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (trendingError) {
        return (
            <View className="flex-1 justify-center items-center bg-[#030014] px-5">
                <Text className="text-white">
                    Error: {trendingError?.message}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#030014]">
            <Image source={images.bg} className="absolute w-full z-0" />
            <FlatList
                data={movies}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => <MovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                }}
                className="px-5 pb-32"
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={
                    <>
                        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
                        <SearchBar
                            onPress={() => router.push("/search")}
                            placeholder="Search for a Movie"
                        />

                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mb-3">
                                    Trending Movies
                                </Text>
                                <FlatList
                                    horizontal
                                    data={uniqueTrendingMovies}
                                    renderItem={({ item, index }) => (
                                        <TrendingCard movie={item} index={index} />
                                    )}
                                    keyExtractor={(item, index) =>
                                        `${item.movie_id}-${index}`
                                    }
                                    ItemSeparatorComponent={() => <View className="w-4" />}
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-4 mt-3"
                                />
                            </View>
                        )}

                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Latest Movies
                        </Text>
                    </>
                }
                ListFooterComponent={
                    loading ? (
                        <View className="py-4">
                            <ActivityIndicator color="#fff" />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}
