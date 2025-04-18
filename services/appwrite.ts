//track searches made by the user

import {Client, Databases, ID, Query} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async(query : string , movie : Movie)=> {
    try {
        console.log("Search Query:", query);
        console.log("Movie ID:", movie.id);
        console.log("Movie Title:", movie.title);
        console.log("Searching for existing document...");
        console.log("Using AppWrite Project ID:", process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title : movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    }
    catch(error){
        console.error(error);
        throw error;

    }
    //checking if a record of that search has already stored
    //if doc is found increment the search count
    //if no document is found , create a new doc in appWrite database with count = 1
}


export const getTrendingMovies = async() : Promise<TrendingMovie[] | undefined> => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])
        return result.documents as unknown as TrendingMovie[];
    }catch(error){
        console.log("Error in getTrendingMovies:", error);
        return undefined;
    }
}