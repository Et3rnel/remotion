import {numberOfGifLoopsOption} from './number-of-gif-loops';
import {offthreadVideoCacheSizeInBytes} from './offthreadvideo-cache-size';
import {videoBitrate} from './video-bitrate';

export const optionsMap = {
	renderMedia: {
		offthreadVideoCacheSizeInBytes,
		videoBitrate,
		numberOfGifLoops: numberOfGifLoopsOption,
	},
	renderStill: {
		offthreadVideoCacheSizeInBytes,
	},
	getCompositions: {
		offthreadVideoCacheSizeInBytes,
	},
	selectComposition: {
		offthreadVideoCacheSizeInBytes,
	},
	renderFrames: {
		offthreadVideoCacheSizeInBytes,
	},
	renderMediaOnLambda: {
		offthreadVideoCacheSizeInBytes,
		videoBitrate,
		numberOfGifLoops: numberOfGifLoopsOption,
	},
	renderStillOnLambda: {
		offthreadVideoCacheSizeInBytes,
	},
	getCompositionsOnLambda: {
		offthreadVideoCacheSizeInBytes,
	},
	renderMediaOnCloudRun: {
		offthreadVideoCacheSizeInBytes,
		numberOfGifLoops: numberOfGifLoopsOption,
	},
	renderStillOnCloudRun: {
		offthreadVideoCacheSizeInBytes,
	},
} as const;
