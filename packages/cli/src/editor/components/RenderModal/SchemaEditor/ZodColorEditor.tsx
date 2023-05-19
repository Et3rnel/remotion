import React, {useCallback, useMemo, useState} from 'react';
import type {z} from 'zod';
import {colorWithNewOpacity} from '../../../../color-math';
import {
	useZodIfPossible,
	useZodTypesIfPossible,
} from '../../get-zod-if-possible';
import {Row, Spacing} from '../../layout';
import {InputDragger} from '../../NewComposition/InputDragger';
import {RemotionInput} from '../../NewComposition/RemInput';
import {RemInputTypeColor} from '../../NewComposition/RemInputTypeColor';
import {ValidationMessage} from '../../NewComposition/ValidationMessage';
import {narrowOption, optionRow} from '../layout';
import {SchemaLabel} from './SchemaLabel';
import type {JSONPath} from './zod-types';
import type {UpdaterFunction} from './ZodSwitch';

type LocalState = {
	value: string;
	zodValidation: z.SafeParseReturnType<unknown, unknown>;
};

const fullWidth: React.CSSProperties = {
	width: '100%',
};

export const ZodColorEditor: React.FC<{
	schema: z.ZodTypeAny;
	jsonPath: JSONPath;
	value: string;
	defaultValue: string;
	setValue: UpdaterFunction<string>;
	onSave: (updater: (oldNum: unknown) => string) => void;
	onRemove: null | (() => void);
	compact: boolean;
	showSaveButton: boolean;
	saving: boolean;
}> = ({
	jsonPath,
	value,
	setValue,
	showSaveButton,
	defaultValue,
	schema,
	compact,
	onSave,
	onRemove,
	saving,
}) => {
	const z = useZodIfPossible();
	if (!z) {
		throw new Error('expected zod');
	}

	const zodTypes = useZodTypesIfPossible();
	if (!zodTypes) {
		throw new Error('expected zod color');
	}

	const [localValue, setLocalValue] = useState<LocalState>(() => {
		return {
			value,
			zodValidation: schema.safeParse(value),
		};
	});

	const onValueChange = useCallback(
		(newValue: string, forceApply: boolean) => {
			const safeParse = schema.safeParse(newValue);
			const newLocalState: LocalState = {
				value: newValue,
				zodValidation: safeParse,
			};
			setLocalValue(newLocalState);
			if (safeParse.success || forceApply) {
				setValue(() => newValue);
			}
		},
		[schema, setValue]
	);

	const {a, b, g, r} = localValue.zodValidation.success
		? zodTypes.ZodZypesInternals.parseColor(localValue.value)
		: {a: 1, b: 0, g: 0, r: 0};

	const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			const newColor = colorWithNewOpacity(
				e.target.value,
				Math.round(a),
				zodTypes
			);
			const safeParse = schema.safeParse(newColor);
			const newLocalState: LocalState = {
				value: newColor,
				zodValidation: safeParse,
			};
			setLocalValue(newLocalState);
			if (safeParse.success) {
				setValue(() => newColor);
			}
		},
		[a, schema, setValue, zodTypes]
	);

	const onTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(e) => {
			const newValue = e.target.value;
			const safeParse = schema.safeParse(newValue);
			const newLocalState: LocalState = {
				value: newValue,
				zodValidation: safeParse,
			};
			setLocalValue(newLocalState);
			if (safeParse.success) {
				setValue(() => newValue);
			}
		},
		[schema, setValue]
	);

	const reset = useCallback(() => {
		onValueChange(defaultValue, true);
	}, [defaultValue, onValueChange]);

	const save = useCallback(() => {
		onSave(() => value);
	}, [onSave, value]);

	const rgb = `#${r.toString(16).padStart(2, '0')}${g
		.toString(16)
		.padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

	const status = localValue.zodValidation.success ? 'ok' : 'error';

	const colorPicker: React.CSSProperties = useMemo(() => {
		return {
			height: 39,
			width: 45,
			display: 'inline-block',
		};
	}, []);

	const onOpacityChange = useCallback(
		(newValue: string) => {
			const newColor = colorWithNewOpacity(
				localValue.value,
				Math.round((Number(newValue) / 100) * 255),
				zodTypes
			);
			const safeParse = schema.safeParse(newColor);
			const newLocalState: LocalState = {
				value: newColor,
				zodValidation: safeParse,
			};
			setLocalValue(newLocalState);
			if (safeParse.success) {
				setValue(() => newColor);
			}
		},
		[localValue.value, schema, setValue, zodTypes]
	);

	const onOpacityValueChange = useCallback(
		(newValue: number) => {
			const newColor = colorWithNewOpacity(
				localValue.value,
				Math.round((Number(newValue) / 100) * 255),
				zodTypes
			);

			const safeParse = schema.safeParse(newColor);
			const newLocalState: LocalState = {
				value: String(newColor),
				zodValidation: safeParse,
			};
			setLocalValue(newLocalState);
			if (safeParse.success) {
				setValue(() => newColor);
			}
		},
		[localValue.value, schema, setValue, zodTypes]
	);

	return (
		<div style={compact ? narrowOption : optionRow}>
			<SchemaLabel
				compact={compact}
				isDefaultValue={value === defaultValue}
				jsonPath={jsonPath}
				onReset={reset}
				onSave={save}
				showSaveButton={showSaveButton}
				onRemove={onRemove}
				saving={saving}
				valid={localValue.zodValidation.success}
			/>
			<div style={fullWidth}>
				<Row align="center">
					<div style={colorPicker}>
						<RemInputTypeColor
							type="color"
							style={{
								height: 39,
							}}
							value={rgb}
							onChange={onChange}
							className="__remotion_color_picker"
							status={status}
						/>
					</div>
					<Spacing x={1} block />
					<RemotionInput
						value={localValue.value}
						status={status}
						placeholder={jsonPath.join('.')}
						onChange={onTextChange}
						rightAlign={false}
					/>
					<Spacing x={1} />
					<InputDragger
						onTextChange={onOpacityChange}
						onValueChange={onOpacityValueChange}
						status={status}
						value={(a / 255) * 100}
						min={0}
						max={100}
						step={1}
						formatter={(v) => `${Math.round(Number(v))}%`}
						rightAlign={false}
					/>
				</Row>
				{!localValue.zodValidation.success && (
					<>
						<Spacing y={1} block />
						<ValidationMessage
							align="flex-start"
							message={localValue.zodValidation.error.format()._errors[0]}
							type="error"
						/>
					</>
				)}
			</div>
		</div>
	);
};
