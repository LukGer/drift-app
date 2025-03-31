import { rubberBand } from "@/utils/rubberband";
import { router } from "expo-router";
import { PlusCircleIcon, XCircleIcon } from "lucide-react-native";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function AddPage() {
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 150 });
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
    });
  }, []);

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withSpring(1000, {
      damping: 20,
      stiffness: 90,
    });
    // Delay actual close to allow animation to complete
    setTimeout(() => router.back(), 300);
  };

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationY < 0) {
        translateY.value = rubberBand(event.translationY, 10);
      } else {
        translateY.value = event.translationY;
        opacity.value = interpolate(
          event.translationY,
          [0, 400],
          [1, 0],
          "clamp"
        );
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        runOnJS(handleClose)();
      } else {
        opacity.value = withTiming(1, { duration: 200 });
        translateY.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${opacity.value * 0.5})`,
  }));

  return (
    <>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, backdropStyle]}>
          <Animated.View style={[styles.spacer]} />
          <Animated.View style={animatedStyle}>
            <View className="flex flex-row-reverse">
              <TouchableOpacity
                onPress={handleClose}
                className="bg-gray-100 rounded-full p-2 mb-4"
              >
                <XCircleIcon color="black" size={32} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TouchableOpacity
                style={styles.button}
                className="bg-blue-800/10"
              >
                <PlusCircleIcon color="black" />
                <Text style={styles.buttonText}>Add new space</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                className="bg-green-800/10"
              >
                <PlusCircleIcon color="black" />
                <Text style={styles.buttonText}>Add new expense</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 22,
  },
  spacer: {
    flex: 1,
  },
  modalBody: {
    overflow: "hidden",
    borderRadius: 36,
    backgroundColor: "white",
    padding: 16,
    gap: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 24,
    gap: 16,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "Nunito",
  },
});
