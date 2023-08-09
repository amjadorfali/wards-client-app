import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import useEditTeam from './mutations/useEditTeam';
import { toast } from 'react-toastify';

interface EditTeamFormValues {
	name: string;
}

type RouteParams = {
	editTeamId: string;
};

const EditTeam: React.FC = () => {
	const { mutate: editTeam } = useEditTeam();
	const params = useParams<RouteParams>();
	const editTeamForm = useForm<EditTeamFormValues>();
	const { currentUser, internalUserQuery } = useGetCurrentUser();
	const navigate = useNavigate();

	const selectedTeam = useMemo(
		() => currentUser.teams?.find((team) => team.uuid === params.editTeamId),
		[currentUser.teams, params.editTeamId]
	);

	useEffect(() => {
		if (!selectedTeam && internalUserQuery.isSuccess) {
			navigate('../');
		}
	}, [selectedTeam, internalUserQuery.isSuccess, navigate]);

	const handleSubmit = (data: EditTeamFormValues) => {
		if (params.editTeamId)
			editTeam(
				{
					teamId: params.editTeamId,
					name: data.name
				},
				{
					onSuccess: () => {
						toast('Changes are saved!', { type: 'success' });
						internalUserQuery.refetch();
						navigate('../');
					},
					onError: () => toast('Something went wrong, please try again later.', { type: 'error' })
				}
			);
	};
	return (
		<Grid container alignContent={'center'} justifyContent={'center'}>
			<Grid item xs={12}>
				<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
					Teams
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h2">Edit team: {selectedTeam?.name}</Typography>
			</Grid>
			<br />
			<br />
			<br />

			{selectedTeam && (
				<Grid gap={4} container item xs={12} component={'form'} onSubmit={editTeamForm.handleSubmit(handleSubmit)}>
					{/* Normal settings */}
					<Grid container item xs={12} gap={4} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
						{/* Monitor URL and Notification methods */}
						{/* <Grid container item > */}
						<Grid item xs={12} sm={4} container justifyContent={'center'}>
							<Typography variant="h4">Team configuration</Typography>
							<br />
							<Typography paragraph>{/* Configure your */}</Typography>
						</Grid>

						<Grid
							item
							xs={12}
							sm={7}
							direction={'column'}
							container
							justifyContent={'center'}
							alignContent={'center'}
							component={Paper}
							p={3}
						>
							<ControlledTextField
								controller={{
									rules: {
										required: { value: true, message: 'Please enter a name' }
									},
									defaultValue: selectedTeam?.name,
									name: 'name'
								}}
								control={editTeamForm.control}
								textFieldProps={{
									margin: 'normal',
									name: 'text',
									label: 'team name',
									InputLabelProps: { required: true },
									sx: { minHeight: '5rem' },
									type: 'text'
								}}
							/>
							<Button type="submit" variant="contained">
								Save
							</Button>
						</Grid>
						{/* </Grid> */}
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};
export default EditTeam;
