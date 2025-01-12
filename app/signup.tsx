import { StyleSheet,View, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import MyBtn from '@/components/MyBtn';
import { useRouter } from 'expo-router';
import RegisterButton from '@/components/RegisterButton';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons


const SignUp = () => {
    const router = useRouter();
    const onContinue = () =>{
        router.navigate("/login");
     }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Email validation regex
  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation regex
  const isValidPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = async () => {
    // Validate inputs
    if (!name || !email || !password) {
      Alert.alert('Validation Error', 'Please fill all the input!');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address!');
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long and include:\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character'
      );
      return;
    }
    if(password!=confirmPassword){
        Alert.alert('Validation Error','Passwords do not match!');
          return;
    }

    setLoading(true);

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name});
      
      Alert.alert('Success', 'Account Created Successfully!');
      router.navigate('/login');
    } catch (error: any){
      console.error(error);
      Alert.alert('Sign Up Error', error.message || 'Failed to create new account!');      
    } finally{
      setLoading(false);
    }
  };

    return (
        <View style={styles.container}>
          <Image source={require('../assets/images/logo-bg.png')} style={{width: 310, height: 120, resizeMode: 'center' }} />
            <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold'}}>Create a new account</Text>
            <TextInput
                placeholder="Enter your Name"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Enter your email address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                
            />
            
            <View style={styles.passwordContainer}>
            <TextInput
                placeholder="Enter your password"
                style={styles.inputWithIcon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color="#888"
                    style={styles.eyeIcon}
                  />                  
                </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
            <TextInput
                placeholder="Re-enter your password"
                style={styles.inputWithIcon}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={()=> setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color="#888"
                    style={styles.eyeIcon}
                  />                  
                </TouchableOpacity>
            </View>
             <RegisterButton onPress={handleSignUp} loading={loading} />
            <Text style={{textAlign:'center' ,fontSize:15, fontWeight:'bold'}}>Already have an account?</Text>
            <MyBtn btnTitle={"Log In"} onPress={onContinue}/>
        </View>
    );
  
}

export default SignUp


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#CCCFEC",
        justifyContent: 'center',
        padding:20,
        gap:15 
    },
    input:{
        borderWidth: 1,
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      height: 50,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    inputWithIcon: {
      flex:1,
      height: '100%',
    },
    eyeIcon: {
      marginLeft: 10
    }
});