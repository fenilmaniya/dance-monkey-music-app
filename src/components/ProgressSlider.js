import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import Slider from 'react-native-slider';

const ScreenWidth = Dimensions.get('window').width;

function ProgressSlider({ duration, dr }) {

	const progress = useProgress();

	return (
		<View>
			<Slider
				value={progress.position}
				maximumValue={duration ?? dr}
				style={styles.sliderStyle}
				minimumTrackTintColor={'white'}
				maximumTrackTintColor={`rgba(255, 255, 255, 0.3)`}
				thumbTouchSize={styles.thumbSize}
				trackStyle={styles.barStyle}
				thumbStyle={styles.thumbStyle}
				onSlidingComplete={v => TrackPlayer.seekTo(v)}
			/>
		</View>
	);
}

export default ProgressSlider;

const styles = StyleSheet.create({
	sliderStyle: {
	},
	thumbSize: {
		width: ScreenWidth * 1.5,
		height: 40
	},
	barStyle: {
		height: 3
	},
	thumbStyle: {
		height: 0,
		width: 0
	}
})