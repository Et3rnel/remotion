import {LambdaClient} from '@aws-sdk/client-lambda';
import {CliInternals} from '@remotion/cli';
import {BINARY_NAME} from '../api/bundle-remotion';
import {getRemotionS3Buckets} from '../api/get-buckets';
import {cleanupLambdas, getRemotionLambdas} from '../cleanup/cleanup-lambdas';
import {cleanUpBuckets} from '../cleanup/s3-buckets';
import {AwsRegion} from '../pricing/aws-regions';
import {getLambdaClient} from '../shared/aws-clients';
import {chunk} from '../shared/chunk';
import {getAwsRegion} from './get-aws-region';
import {Log} from './log';

export const CLEANUP_COMMAND = 'cleanup';
export const CLEANUP_LAMBDAS_SUBCOMMAND = 'lambdas';
const CLEANUP_S3_BUCKETS_SUBCOMMAND = 'buckets';

const cleanupLambdaCommand = async (client: LambdaClient) => {
	await cleanupLambdas({
		lambdaClient: client,
		onAfterDelete: (lambdaName: string) =>
			Log.info(CliInternals.chalk.blue(`Deleted ${lambdaName}`)),
	});
	Log.info('All Remotion-related lambdas deleted.');
};

const cleanupBucketsCommand = async (region: AwsRegion) => {
	await cleanUpBuckets({
		region,
		onBeforeBucketDeleted: (bucketName) => {
			Log.info(`Deleting items of ${bucketName}`);
		},
		onAfterItemDeleted: ({itemName}) => {
			Log.info(CliInternals.chalk.gray(`  Deleting item ${itemName}`));
		},
		onAfterBucketDeleted: (bucketName: string) =>
			Log.info(CliInternals.chalk.blue(`Deleted bucket ${bucketName}.`)),
	});
	Log.info('All Remotion-related buckets deleted.');
};

export const cleanupCommand = async (args: string[]) => {
	const region = getAwsRegion();
	if (args[0] === CLEANUP_LAMBDAS_SUBCOMMAND) {
		await cleanupLambdaCommand(getLambdaClient(getAwsRegion()));
		return;
	}

	if (args[0] === CLEANUP_S3_BUCKETS_SUBCOMMAND) {
		await cleanupBucketsCommand(getAwsRegion());
		return;
	}

	const fetching = CliInternals.createOverwriteableCliOutput();
	fetching.update('Fetching AWS account...');

	const [{remotionBuckets}, lambdas] = await Promise.all([
		getRemotionS3Buckets(region),
		getRemotionLambdas(getLambdaClient(region)),
	]);
	if (remotionBuckets.length === 0 && lambdas.length === 0) {
		fetching.update(
			`Your AWS account in ${region} contains no following Remotion-related resources.\n`
		);
		return;
	}

	fetching.update(
		`Your AWS account in ${region} contains the following Remotion-related resources:\n\n`
	);
	if (remotionBuckets.length !== 0) {
		Log.info(
			`${remotionBuckets.length} ${
				remotionBuckets.length === 1 ? 'bucket' : 'buckets'
			}:`
		);
		Log.info(
			`${chunk(remotionBuckets, 2)
				.map((b) =>
					CliInternals.chalk.blue(
						b.map((a) => (a.Name as string).padEnd(40, ' ')).join(' ')
					)
				)
				.join('\n')}`
		);

		Log.info(
			CliInternals.chalk.gray(
				`Run \`${BINARY_NAME} ${CLEANUP_COMMAND} ${CLEANUP_S3_BUCKETS_SUBCOMMAND}\` to permanently delete S3 buckets`
			)
		);
		Log.info();
	}

	if (lambdas.length > 0) {
		Log.info(
			`${lambdas.length} ${lambdas.length === 1 ? 'lambda' : 'lambdas'}:`
		);
		Log.info(
			`${chunk(lambdas, 2)
				.map((b) =>
					CliInternals.chalk.blue(
						b.map((a) => (a.FunctionName ?? '').padEnd(40, ' ')).join(' ')
					)
				)
				.join('\n')}`
		);
		Log.info(
			CliInternals.chalk.gray(
				`Run \`${BINARY_NAME} ${CLEANUP_COMMAND} ${CLEANUP_LAMBDAS_SUBCOMMAND}\` to permanently delete lambdas`
			)
		);
		Log.info();
	}
};
