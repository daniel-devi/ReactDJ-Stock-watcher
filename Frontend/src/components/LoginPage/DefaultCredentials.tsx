import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const DefaultCredentials = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("Email: admin@admin.com\nPassword: admin@123");
    alert("Credentials copied to clipboard!");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
    >
      <Card
        sx={{
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            textAlign="center"
          >
            Default Credentials
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="text.secondary"
            mb={2}
          >
            Use the following credentials to log in:
          </Typography>
          <Typography
            variant="body1"
            component="p"
            mb={1}
            fontWeight="bold"
          >
            Email: <Typography component="span" color="primary">admin@admin.com</Typography>
          </Typography>
          <Typography
            variant="body1"
            component="p"
            mb={3}
            fontWeight="bold"
          >
            Password: <Typography component="span" color="primary">admin@123</Typography>
          </Typography>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
          >
            Copy Credentials
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DefaultCredentials;
