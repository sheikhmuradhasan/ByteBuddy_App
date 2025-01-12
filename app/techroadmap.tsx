import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

// Define types for the roadmap steps
interface Resource {
  name: string;
  link: string;
}

interface Step {
  title: string;
  description: string;
  resources: Resource[];
}

const roadmapSteps: Step[] = [
  {
    title: "Learn HTML",
    description: "Start with the basics of structure.",
    resources: [
      { name: "MDN Docs", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "FreeCodeCamp", link: "https://www.freecodecamp.org/learn/responsive-web-design/" },
    ],
  },
  {
    title: "Learn CSS",
    description: "Style your web pages.",
    resources: [
      { name: "CSS Tricks", link: "https://css-tricks.com/" },
      { name: "MDN Docs", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
  },
  {
    title: "Learn Bootstrap/Tailwind CSS",
    description: "Style your web pages.",
    resources: [
      { name: "CSS Tricks", link: "https://css-tricks.com/" },
      { name: "MDN Docs", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
  },
  {
    title: "Learn JavaScript",
    description: "Add interactivity to websites.",
    resources: [
      { name: "JavaScript Info", link: "https://javascript.info/" },
      { name: "Eloquent JavaScript", link: "https://eloquentjavascript.net/" },
    ],
  },
  {
    title: "Learn React",
    description: "Add interactivity to websites.",
    resources: [
      { name: "JavaScript Info", link: "https://javascript.info/" },
      { name: "Eloquent JavaScript", link: "https://eloquentjavascript.net/" },
    ],
  },
  {
    title: "Learn PHP",
    description: "Add interactivity to websites.",
    resources: [
      { name: "JavaScript Info", link: "https://javascript.info/" },
      { name: "Eloquent JavaScript", link: "https://eloquentjavascript.net/" },
    ],
  },
];

const screenWidth = Dimensions.get("window").width;

const TechSkillRoadmap: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);

  const handleStepClick = (step: Step) => {
    setSelectedStep(step);
  };

  const closePopup = () => {
    setSelectedStep(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
  <View style={styles.roadmapContainer}>
    {roadmapSteps.map((step, index) => (
      <View
        key={index}
        style={[
          styles.stepContainer,
          index % 2 === 0 ? styles.stepContainerLeft : styles.stepContainerRight, // Alternate position
        ]}
      >
        {/* Circle for the step */}
        <Svg height="50" width="50">
          <Circle cx="25" cy="25" r="20" fill="#000" />
        </Svg>

        {/* Step Details */}
        <TouchableOpacity style={styles.stepDetails} onPress={() => handleStepClick(step)}>
          <Text style={styles.stepTitle}>{step.title}</Text>
        </TouchableOpacity>

        {/* S-Shape Connecting Line */}
        {index < roadmapSteps.length - 1 && (
          <Svg height="100" width="100">
            <Path
              d={
                index % 2 === 0
                  ? "M20 0 C20 40, 80 60, 80 100" // Right S-curve
                  : "M80 0 C80 40, 20 60, 20 100" // Left S-curve
              }
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
        )}
      </View>
    ))}
  </View>

  {/* Popup for step details */}
  <Modal visible={!!selectedStep} transparent animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{selectedStep?.title}</Text>
        <Text style={styles.modalDescription}>{selectedStep?.description}</Text>
        <Text style={styles.modalResourcesTitle}>Resources:</Text>
        {selectedStep?.resources.map((resource, index) => (
          <Text key={index} style={styles.modalResource}>
            - {resource.name}: {resource.link}
          </Text>
        ))}
        <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
</ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#CCCFEC",
  },
  roadmapContainer: {
    alignItems: "center",
  },
  stepContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  stepContainerLeft: {
    paddingRight: 0, // Left-aligned for odd steps
  },
  stepContainerRight: {
    paddingLeft: 50, // Right-aligned for even steps
  },
  stepDetails: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 20,
    maxWidth: 200,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#CCCFEC",
    padding: 20,
    borderRadius: 10,
    width: screenWidth * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  modalResourcesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  modalResource: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TechSkillRoadmap;
