import { Box, Typography, styled } from '@mui/material'

interface IProps {
  text: string
  mainText: string
}

const StyledText = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '20px',
  color: '#425862',
  marginBottom: '4px',
}))

const StyledTypography = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 28,
  lineHeight: '36px',
  color: '#000',
  marginBottom: '24px',
}))

const Breadcrumb = ({ text, mainText }: IProps) => {
  return (
    <Box>
      <StyledText>{text}</StyledText>
      <StyledTypography>{mainText}</StyledTypography>
    </Box>
  )
}

export default Breadcrumb
