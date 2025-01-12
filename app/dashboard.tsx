import LogoutButton from '@/components/LogoutButton';
import { auth } from '@/firebaseConfig';
import { router, useRouter } from 'expo-router';
import { Route } from 'expo-router/build/Route';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type AllowedRoutes = 
  | "/techroadmap"
  | "/dailyquiz"
  | "/codingtracker"
  | "/courseresourse"
  | "/examtracker"
  | "/questiontracker"
  | "/jobalert"
  | "/aichatbot"
  | "/qsforum";

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUsername(user.displayName || 'User');
      } else {
        // User is signed out
        router.navigate('/login'); // Redirect to login page
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  useEffect(() =>{
    const fetchUsername = () =>{
      const user =auth.currentUser;
      if(user && user.displayName){
        setUsername(user.displayName);
      }
    };

    fetchUsername();
  }, []);

  const features: { id: number; name: string; icon: string; route: AllowedRoutes }[] = [
    { id: 1, name: 'Tech Skill Roadmap', icon: 'earth-outline', route: '/techroadmap' },
    { id: 2, name: 'Daily Coding & IT Quiz', icon: 'terminal-outline', route: '/dailyquiz' },
    { id: 3, name: 'Coding Habit Tracker', icon: 'checkmark-done-outline', route: '/codingtracker' },
    { id: 4, name: 'Course, Lab Resources & Ebooks', icon: 'book-outline', route: '/courseresourse' },
    { id: 5, name: 'Exam, Tutorials and Assignment Tracker', icon: 'school-outline', route: '/examtracker' },
    { id: 6, name: 'Previous Question Tracker', icon: 'time-outline', route: '/questiontracker' },
    { id: 7, name: 'Job, Internship & Event Alerts', icon: 'briefcase-outline', route: '/jobalert' },
    { id: 8, name: 'AI Educational Chatbot', icon: 'rocket-outline', route: '/aichatbot' },
    { id: 9, name: 'Question Solver Forum', icon: 'chatbubbles-outline', route: '/qsforum' },
  ];
  

  const customLayout = [
    [features[0], features[1]], // Row 1 items 
    [features[2]],              // Row 2 items
    [features[3], features[4]], // Row 3 items
    [features[5]],              // Row 4 items
    [features[6], features[7]], // Row 5 items
    [features[8]],              // Row 6 items
  ];

  return (

    <View style={styles.container}>
    {/* <Image source={require('../assets/images/logo-bg.png')} style={{width: 310, height: 120, resizeMode: 'center' }} /> */}
    <ScrollView style={styles.scrollContent}>
      <Text style={styles.greeting}>Welcome, {username || 'User'} 👋</Text>

      {customLayout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[
                styles.featureContainer,
                row.length === 1 && styles.singleFeatureContainer, // Full width for single-item rows
              ]}
              onPress={() => router.push(feature.route)}
            >
              <View style={styles.iconContainer}>
                <Icon name={feature.icon} size={24} color="#7C84D7" />
              </View>
              <Text style={styles.featureText}>{feature.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>

    <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button}>
          <View style={[styles.iconButton, { backgroundColor: '#7C84D7' }]}>
            <Icon name="home-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconButton}>
            <Icon name="person-outline" size={20} color="#7C84D7" />
          </View>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconButton}>
            <Icon name="chatbubbles-outline" size={20} color="#7C84D7" />
          </View>
          <Text style={styles.buttonText}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.navigate("/login")}>
          <View style={styles.iconButton}>
            <Icon name="log-out-outline" size={20} color="#7C84D7" />
          </View>
          <Text style={styles.buttonText}>LogOut</Text>
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCFEC',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 80,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Spacing between rows
  },
  featureContainer: {
    backgroundColor: '#fff',
    width: '48%', // Default width for two items in a row
    padding: 15,
    borderRadius: 15,
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  singleFeatureContainer: {
    width: '100%', // Full width for single-item rows
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 132, 215, 0.3)', // Transparent circle
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '95%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10, 
  },
  button: {
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(124, 132, 215, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
});