import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'

const Container = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: '100%',
  height: '100%',
  display: 'grid',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '5px 1fr 5px',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 2fr 1fr',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '3fr 4fr 3fr',
  },
  gridTemplateRows: '2fr 3fr 2fr',
}))

const FormCard = styled(Paper)(({ theme }) => {
  const gap = theme.spacing(2)
  return {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    display: 'grid',
    gridTemplateColumns: `${gap} 1fr 3fr ${gap} 3fr 1fr ${gap}`,
    gridTemplateRows: `${gap} 1fr 4fr 3fr auto ${gap}`,
  }
})

const Title = styled(Typography)({
  gridColumn: '2 / -2',
  gridRow: '2 / 3',
})

const Instructions = styled(Typography)({
  fontSize: 14,
  gridColumn: '2 / -2',
  gridRow: '3 / 4',
})

const EmailField = styled(TextField)({
  gridColumn: '2 / -2',
  gridRow: '4 / 5',
})

const ResetButton = styled(Button)({
  gridColumn: '3 / 4',
  gridRow: '5 / 6',
})

type Props = {
  title: string;
  autoFocus: boolean;
  initialEmailAddress: string;
  instructions: string;
  actionnName: string;
  inputIsDisabled: boolean;
  actionIsDisabled: boolean;
}

const AuthForm = ({
  title,
  autoFocus,
  initialEmailAddress,
  instructions,
  actionnName,
  inputIsDisabled,
  actionIsDisabled,
}: Props) => (
  <Container>
    <FormCard>
      <Title variant="h5">{title}</Title>
      <Instructions color="text.secondary">
        {instructions}
      </Instructions>
      <EmailField
        label="Email"
        type="email"
        InputProps={{
          name: 'email',
        }}
        autoFocus={autoFocus}
        fullWidth
        disabled={inputIsDisabled}
        defaultValue={initialEmailAddress}
      />
      <ResetButton
        type="submit"
        disabled={actionIsDisabled}
      >
        {actionnName}
      </ResetButton>
    </FormCard>
  </Container>
)

export default AuthForm
