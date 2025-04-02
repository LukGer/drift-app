import { rubberBand } from "@/utils/rubberband";
import { useEffect } from "react";
import { Modal, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type DriftModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const DriftModal = (props: DriftModalProps) => {
  const translateY = useSharedValue(1000);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (props.isVisible) {
      opacity.value = withTiming(1, { duration: 150 });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
        mass: 0.5,
      });
    }
  }, [props.isVisible]);

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withSpring(1000, {
      damping: 20,
      stiffness: 90,
    });
    // Delay actual close to allow animation to complete
    setTimeout(props.onClose, 300);
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
    <Modal
      visible={props.isVisible}
      onRequestClose={handleClose}
      transparent={true}
      animationType="none"
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, backdropStyle]}>
          <Animated.View style={[styles.spacer]} />
          <Animated.View style={[styles.modalBody, animatedStyle]}>
            {props.children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

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
  },
});

export default DriftModal;
