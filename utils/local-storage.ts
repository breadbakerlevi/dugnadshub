import { PostData } from "@/types/post";
import AsyncStorage from "@react-native-async-storage/async-storage";

  export async function storeData(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value);
        console.log("Stored!");
    } catch (e) {
        console.log("Feil med storeData()" + e);
    }
  }

  export async function getData(key: string) {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            console.log(data);
            return data;
        }
    } catch (e) {
        console.log("Feil med storeData()" + e);
    }
  }

  export async function getPostByLocalId(id: string) {
    try {
        const data = await AsyncStorage.getItem("postStore");
        if (data !== null) {
          const posts: PostData[] = JSON.parse(data);
          return posts.find(post => post.id === id);
        }
    } catch (e) {
      console.log("Feil med getPostByIdLocal()", e)
    }
  }


  export async function updatePostById(id: string, updatePost: PostData) {
    try {
      const data = await AsyncStorage.getItem("postStore");
        if (data !== null) {
          const posts: PostData[] = JSON.parse(data);
          
          const updatedPosts = posts.map(exisitingPost => exisitingPost.id === id ? updatePost : exisitingPost)
          await AsyncStorage.setItem("postStore", JSON.stringify(updatedPosts));
        }
    } catch (e) {
      console.log("Feil med updatePostByid()", e);
    }
  }
