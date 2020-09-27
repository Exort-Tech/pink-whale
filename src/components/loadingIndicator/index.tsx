//@ts-ignore
import AnimatedLoader from 'react-native-animated-loader';
import React from 'react';
import { StyleSheet } from 'react-native';

interface FullScreenLoaderProps {
  visible: boolean;
}

const FullScreenLoader = ({ visible }: FullScreenLoaderProps) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}
      source={require('assets/images/loadingAnimation.json')}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: 200,
    width: 200,
  },
});

export { FullScreenLoader };
