import { db, getDownloadUrl } from "@/firebaseConfig";
import { PostData } from "@/types/post";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import { uploadImageToFirebase } from "./imageApi";

// Opprette en dugnad (post)
export async function createPost(post: PostData) {
  try {
    const firebaseImage = await uploadImageToFirebase(post.imageUri);
    if (!firebaseImage) {
      console.error("Error while uplaoding image");
      return;
    }

    const postImageDownloadUrl = await getDownloadUrl(firebaseImage);
    const postWithImage: PostData = {
      ...post,
      imageUri: postImageDownloadUrl,
      status: post.status,
      createdAt: post.createdAt
    };
    const docRef = await addDoc(collection(db, "posts"), postWithImage);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log("Error creating post", e);
  }
}

// Hente alle dugnader sortert etter dato slik at nyeste kommer først
export async function getAllPosts() {
  try {
    const queryResult = await getDocs(
      query(collection(db, "posts"), orderBy("createdAt", "desc"))
    );
    const posts = queryResult.docs.map(
      (docSnap) =>
        ({
          ...docSnap.data(),
          id: docSnap.id,
        } as PostData)
    );
    console.log("Successfully fetched posts");
    return posts;
  } catch (e) {
    console.log("Error getting all posts", e);
    return [] as PostData[];
  }
}

// Hente én dugnad
export async function getPostById(id: string) {
  try {
    const specificPost = await getDoc(doc(db, "posts", id));
    return {
      ...specificPost.data(),
      id: specificPost.id,
    } as PostData;
  } catch (e) {
    console.log("Error getting document by id: ", e);
    return null;
  }
}

// Brukerens dugnader (viktig for profil siden)
// Slet med å få det til å funke med firebase, selv med oppdatert index osv. 
// Brukte denne som referanse: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
export async function getPostsForUser(userId: string) {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "posts"), where("authorId", "==", userId))
    );
    
    const posts = querySnapshot.docs.map((docSnap) => {
      return { ...docSnap.data(), id: docSnap.id } as PostData;
    });

    return posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (e) {
    console.log("Error getting all posts for user", e);
    return [] as PostData[];
  }
}

// Søk og filtrering
export async function getFilteredPosts(filters: {
  categories?: string[];
  authorId?: string;
  participantId?: string;
  searchText?: string;
  statusFilter?: string;
}) {
  try {
    const allPosts = await getAllPosts();
    
    let filteredPosts = allPosts;

    // Søk i tittel
    if (filters.searchText && filters.searchText.trim() !== "") {
      const searchTerm = filters.searchText.toLowerCase().trim();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filtrer på kategorier
    if (filters.categories && filters.categories.length > 0) {
      filteredPosts = filteredPosts.filter(post => 
        post.category && filters.categories!.includes(post.category)
      );
    }
    
    // Filtrer på status
    if (filters.statusFilter && filters.statusFilter !== "alle") {
      filteredPosts = filteredPosts.filter(post => 
        post.status === filters.statusFilter
      );
    }
    
    // Brukerens dugnader
    if (filters.authorId) {
      filteredPosts = filteredPosts.filter(post => 
        post.authorId === filters.authorId
      );
    }
    
    // Brukerens påmeldte dugnader
    if (filters.participantId) {
      filteredPosts = filteredPosts.filter(post => 
        post.participants?.includes(filters.participantId!)
      );
    }

    return filteredPosts;
    
  } catch (e) {
    console.error("Error getting filtered posts", e);
    return [] as PostData[];
  }
}

// Toggle favorite for brukeren
export async function toggleFavorite(postId: string, userId: string): Promise<boolean> {
  const favoriteRef = doc(db, "userFavorites", `${userId}_${postId}`);
  
  try {
    const existingFavorite = await getDoc(favoriteRef);
    
    if (existingFavorite.exists()) {
      await deleteDoc(favoriteRef);
      return false; 
    } else {
      await setDoc(favoriteRef, {
        userId,
        postId,
      });
      return true; 
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
}

// Hent alle favoritter for en bruker
export async function getUserFavorites(userId: string): Promise<string[]> {
  try {
    const q = query(
      collection(db, "userFavorites"), 
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data().postId);
  } catch (error) {
    console.error("Error getting user favorites:", error);
    return [];
  }
}

export async function updatePostStatus(postId: string, newStatus: string) {
  try {
    const postRef = doc(db, "posts", postId);
    await setDoc(postRef, { status: newStatus }, { merge: true });
  } catch (error) {
    console.error("Error updating post status:", error);
    throw error;
  }
}

// Melde seg på/av dugnad
// Bruker Firestore transaction for å være sikker på at det ikke kan overbookes.
// Brukte dette som referanse: https://firebase.google.com/docs/firestore/manage-data/transactions
export async function toggleParticipation(postId: string, userId: string) {
  const postRef = doc(db, "posts", postId);

  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(postRef);
    if (!snap.exists()) {
      throw new Error("Dugnad finnes ikke");
    }

    const data = snap.data() as PostData;

    const spots = data.spots ?? 0;
    const participants = data.participants ?? [];

    const alreadyJoined = participants.includes(userId);

    if (!alreadyJoined) {
      if (spots > 0 && participants.length >= spots) {
        throw new Error("Dugnaden er full");
      }
      const updated = [...participants, userId];
      transaction.update(postRef, { participants: updated });
    } else {
      const updated = participants.filter((id) => id !== userId);
      transaction.update(postRef, { participants: updated });
    }
  });
}
