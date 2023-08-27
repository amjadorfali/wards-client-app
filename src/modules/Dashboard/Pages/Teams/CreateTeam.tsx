import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useCreateTeam from './mutations/useCreateTeam';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { toast } from 'react-toastify';

interface CreateTeamFormValues {
	name: string;
}

const CreateTeam: React.FC = () => {
	const createTeamForm = useForm<CreateTeamFormValues>();
	const createTeam = useCreateTeam();
	const { currentUser, internalUserQuery } = useGetCurrentUser();
	const navigate = useNavigate();
	const handleSubmit = (data: CreateTeamFormValues) => {
		createTeam.mutate(
			{
				teamName: data.name,
				userId: currentUser.username || ''
			},

			{
				onSuccess: () => {
					toast('Team created!', { type: 'success' });

					navigate('../');
				},
				onSettled: () => internalUserQuery.refetch(),
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
				<Typography variant="h2">Create team</Typography>
			</Grid>
			<br />
			<br />
			<br />

			<Grid gap={4} container item xs={12} component={'form'} onSubmit={createTeamForm.handleSubmit(handleSubmit)}>
				{/* Normal settings */}
				<Grid container item xs={12} gap={4} sx={{ justifyContent: 'center' }}>
					{/* Monitor URL and Notification methods */}
					{/* <Grid container item > */}
					<Grid item xs={12} container justifyContent={'center'}>
						<Typography variant="h4">Team configuration</Typography>
						<br />
						<Typography paragraph>{/* Configure your */}</Typography>
					</Grid>

					<Grid
						item
						xs={8}
						sm={6}
						md={5}
						lg={4}
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
								defaultValue: '',
								name: 'name'
							}}
							control={createTeamForm.control}
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
							Create
						</Button>
					</Grid>
					{/* </Grid> */}
				</Grid>
			</Grid>
		</Grid>
	);
};
export default CreateTeam;
