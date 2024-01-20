import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
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
  gridTemplateRows: '1fr 3fr 1fr',
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

const SendButton = styled(Button)({
  gridColumn: '5 / 6',
  gridRow: '5 / 6',
})

type Props = {
  title: string;
  autoFocus: boolean;
  emailAdress: string;
  instructions: string;
  resetIsDisabled: boolean;
  sendIsDisabled: boolean;
  onChangeEmailAdress: (emailAdress: string) => void;
  onReset: () => void;
  onSend: () => void;
}

const AuthForm = ({
  title,
  autoFocus,
  emailAdress,
  instructions,
  resetIsDisabled,
  sendIsDisabled,
  onChangeEmailAdress,
  onReset,
  onSend,
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
        autoFocus={autoFocus}
        fullWidth
        disabled={sendIsDisabled}
        value={emailAdress}
        onChange={(event) => {
          onChangeEmailAdress(event.target.value)
        }}
      />
      <ResetButton
        type="reset"
        disabled={resetIsDisabled}
        onClick={onReset}
      >
        Reset
      </ResetButton>
      <SendButton
        type="button"
        disabled={sendIsDisabled}
        onClick={onSend}
      >
        Send email
      </SendButton>
    </FormCard>
  </Container>
)

export default AuthForm
