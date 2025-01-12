// import React from "react";
// import { Stack } from "expo-router";

// const RootLayout =()=> {
//   return(
//     <Stack screenOptions={{headerShown:false}}>
//       <Stack.Screen name="index"/>
//       <Stack.Screen name="signup"/>
//       <Stack.Screen name="login"/>
//       <Stack.Screen name="dashboard"/>
//     </Stack>
//   )
// }

// export default RootLayout;

import React, { useEffect, useState } from "react";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { Stack, useRouter } from "expo-router";
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultApp = initializeApp(config);
initializeAuth(defaultApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const RootLayout = () => {
  const router = useRouter();

  useEffect(()=> getAuth().onAuthStateChanged(value=>{
    if(value){
      console.log("Sign In");
      router.replace("/dashboard");
    }
    else{
      console.log("Sign Out");
      router.replace("/login");
    }
  }))

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
};

export default RootLayout;


