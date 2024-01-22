import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Alert, { type AlertColor } from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'

const Frame = styled(FormControl)(({ theme }) => ({
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

const ContainerPaper = styled(Paper)(({ theme }) => {
  const gap = theme.spacing(2)
  return {
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    display: 'grid',
    gridTemplateColumns: `${gap} 1fr 3fr 1fr ${gap}`,
    gridTemplateRows: `1fr auto ${gap} auto ${gap} auto 1fr auto 1fr`,
  }
})

const Title = styled(Typography)({
  gridColumn: '2 / -2',
  gridRow: '2 / 3',
})

const InstructionsBox = styled(Box)({
  fontSize: 14,
  gridColumn: '2 / -2',
  gridRow: '4 / 5',
  display: 'flex',
  justifyContent: 'center',
})

const EmailField = styled(TextField)({
  gridColumn: '2 / -2',
  gridRow: '6 / 7',
})

const SubmitButton = styled(Button)({
  gridColumn: '3 / 4',
  gridRow: '-3 / -2',
})

type Props = {
  severity: AlertColor;
  title: string;
  initialEmailAddress: string;
  instructions: string;
  actionnName: string;
  inputIsDisabled: boolean;
  actionIsDisabled: boolean;
}

const AuthForm = ({
  severity,
  title,
  initialEmailAddress,
  instructions,
  actionnName,
  inputIsDisabled,
  actionIsDisabled,
}: Props) => (
  <Frame>
    <ContainerPaper>
      <Title variant="h5">{title}</Title>
      <InstructionsBox>
        <Alert severity={severity} about=''>
          {instructions}
        </Alert>
      </InstructionsBox>
      <EmailField
        label="Email"
        type="email"
        InputProps={{
          name: 'email',
        }}
        fullWidth
        disabled={inputIsDisabled}
        defaultValue={initialEmailAddress}
      />
      <SubmitButton
        type="submit"
        disabled={actionIsDisabled}
      >
        {actionnName}
      </SubmitButton>
    </ContainerPaper>
  </Frame>
)

export default AuthForm
