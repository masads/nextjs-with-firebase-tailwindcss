"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    deleteUser,
    signInWithEmailAndPassword,
    updateProfile,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import firebase_app from '@/firebase/config';
import Loader from '@/components/loader';
import { User as FirebaseUser } from "firebase/auth";
import { setDoc, collection, doc, getDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import { useRouter, usePathname } from 'next/navigation';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

interface CustomUser extends FirebaseUser {
    gender?: genderType | null;
    age?: number | null;
}

type UserData = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    age?: string,
    gender?: "Male" | "Female"
}
type genderType = "Male" | "Female";

type AuthContent = {
    user: CustomUser | null,
    login: (email: string, password: string) => any,
    register: (fullName: string, email: string, password: string) => any,
    deleteAccount: () => void,
    Logout: () => void,

    completeProfile: (gender: genderType, age: number | null) => any,
    googleSignIn: () => any,
}


const AuthContext = createContext<AuthContent>({
    user: null, googleSignIn: () => { }, completeProfile: (gender: genderType, age: number | null) => { }, Logout: () => { }, deleteAccount: () => { }, login: () => { return false }, register: () => { },

});

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter();
    const pathname = usePathname()
    const [user, setUser] = useState<CustomUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const googleSignIn = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);

            const firebaseUser: FirebaseUser | null = await getUserDataOnce();
            if (!firebaseUser) throw new Error('User not found');

            const userData = await getUserProfileData(firebaseUser.uid);

            const customUser: CustomUser = {
                ...firebaseUser,
                gender: userData?.gender || null,
                age: userData?.age || null,
            };

            setUser(customUser);
            if (userData) {
                router.push("/home")
            } else {
                router.push("/welcome")
            }
        } catch (error) {
           
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const getUserProfileData = async (userId: string) => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    };

    const getUserDataOnce = (): Promise<FirebaseUser | null> => {
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                unsubscribe();
                resolve(firebaseUser);
            });
        });
    };

    const Logout = async () => {

        try {
            await auth.signOut();
            setUser(null)
            router.push("/login");
        } catch (error) {
        
        }
    };

    const deleteAccount = async () => {
        setLoading(true);
        try {
            const firebaseUser = await getUserDataOnce();
            if (!firebaseUser) return;

            const userRef = doc(db, "users", firebaseUser.uid);
            await deleteDoc(userRef);
            await deleteUser(firebaseUser);
            await auth.signOut();
            setUser(null)
            router.push("/login");
            toast.success("Account Deleted!");
        } catch (error) {
           
        } finally {
            setLoading(false);
        }
    };
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);

            if (!isValidEmail(email)) {
                throw new Error('Please enter a valid email address.');
            }

            if (password.length === 0) {
                throw new Error('Please enter your password.');
            }

            const { user } = await signInWithEmailAndPassword(auth, email, password);

            if (!user) {
                throw new Error('User not found.');
            }

            const userData = await getUserProfileData(user.uid);

            const customUser: CustomUser = {
                ...user,
                gender: userData?.gender || null,
                age: userData?.age || null,
            };

            setUser(customUser);

            const redirectPath = userData ? '/home' : '/welcome';
            router.push(redirectPath);
        } catch (error: any) {
            let message = 'Something went wrong!';

            switch (error.code) {
                case 'auth/invalid-email':
                case 'auth/user-not-found':
                    message = 'Email is invalid or user not found.';
                    break;
                case 'auth/wrong-password':
                    message = 'Wrong password.';
                    break;
                default:
                    if (error.message) {
                        message = error.message;
                    }
                    break;
            }

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
    const register = async (fullName: string, email: string, password: string) => {
        try {
            setLoading(true);

            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(user, { displayName: fullName });

            const customUser: CustomUser = {
                ...user,
                gender: null,
                age: null,
            };

            setUser(customUser);

            router.push('/welcome');
        } catch (error: any) {
            let message = 'Something went wrong!';

            switch (error.code) {
                case 'auth/invalid-email':
                    message = 'Email is invalid.';
                    break;
                case 'auth/weak-password':
                    message = 'Password should be at least 6 characters.';
                    break;
                case 'auth/email-already-in-use':
                    message = 'Email already in use.';
                    break;
                default:
                    if (error.message) {
                        message = error.message;
                    }
                    break;
            }

            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const completeProfile = async (gender: genderType, age: number | null) => {
        // Validation: Check if gender is not empty and age is within a valid range
        setLoading(true);
        if (!gender || age === null || age < 1 || age > 150) {
            toast.error("Invalid gender or age. Please check your input.");
            setLoading(false);
            return;
        }

        try {
            if (!user) throw ("User Not Found")
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                await setDoc(docRef, { gender, age });

                toast.success("Update successfully!");
            } else {
                await setDoc(docRef, { gender, age });
                toast.success("Profile completed successfully!");
                router.push("/home")
            }
            setUser((user: CustomUser | null) => {
                if (user) {
                    return {
                        ...user, gender, age
                    }
                }
                return null;
            })
        } catch (error) {
           
            toast.error("An error occurred while completing your profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loggedInPaths = ['/home', '/welcome'];
        const loggedOutPaths = ['/login', '/signup'];

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            if (firebaseUser) {
                const userData = await getUserProfileData(firebaseUser.uid);
                const customUser: CustomUser = {
                    ...firebaseUser,
                    gender: userData?.gender || null,
                    age: userData?.age || null,
                };
                setUser(customUser);
                const redirectPath = userData ? '/home' : '/welcome';
                setLoading(false);
                router.push(redirectPath);
            } else {
                if (loggedInPaths.includes(pathname)) {
                   
                    router.push('/login');
                }
                setLoading(false);
                setUser(null);

            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, deleteAccount, googleSignIn, completeProfile, Logout, login, register }}>
            {loading ? (
                <div className='min-h-screen  flex justify-center items-center'>
                    <Loader />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );

};