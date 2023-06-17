import { PropsWithChildren, ReactElement } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, UseControllerProps } from 'react-hook-form';

interface Props<TFormValues extends FieldValues> {
	controller: Omit<UseControllerProps<TFormValues>, 'control'>;
	textFieldProps: TextFieldProps;
	control: Control<TFormValues, object>;
}
const ControlledTextField = <TFormValues extends FieldValues>({
	control,
	controller,
	textFieldProps
}: PropsWithChildren<Props<TFormValues>>): ReactElement => {
	return (
		<Controller
			render={({ field, fieldState }) => (
				<TextField {...field} helperText={fieldState.error?.message ?? ''} error={!!fieldState.error?.message} {...textFieldProps} />
			)}
			{...controller}
			control={control}
		/>
	);
};

export default ControlledTextField;
