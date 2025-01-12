import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { SplashScreen, useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  useEffect(() => {
    SplashScreen.hide();

    
    const timeout = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animation.json')} 
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={{ fontSize:30, marginTop:-70, fontWeight:'bold',}}>ByteBuddy</Text>
      
    </View>
    
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCFEC', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 700,
    height: 300,
    marginTop:-70,
  },
});
