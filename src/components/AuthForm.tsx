import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

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
  <Container fixed>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          autoFocus={autoFocus}
          fullWidth
          disabled={sendIsDisabled}
          value={emailAdress}
          onChange={(event) => {
            onChangeEmailAdress(event.target.value)
          }}
        />
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {instructions}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          type="reset"
          disabled={resetIsDisabled}
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          type="button"
          disabled={sendIsDisabled}
          onClick={onSend}
        >
          Send email
        </Button>
      </CardActions>
    </Card>
  </Container>
)

export default AuthForm
