import { Box, styled } from '@mui/material'
import DropzoneSource from 'react-dropzone-uploader'
import SVG from 'react-inlinesvg'
import FileIcon from 'resources/icons/bx-file.svg'
import Close from '../../resources/icons/white-close.png'
import PDFViewer from 'pdf-viewer-reactjs'
import { useMemo } from 'react'
import closeBG from '../../resources/icons/Close.svg'
import './styles.scss'
import { CAPTURE_THUMBNAIL_ID } from 'utils/constants'
const StyledDropzoneWrapper = styled(Box)(() => ({
  dropzoneContainer: {
    '& .dzu-inputLabel': {
      fontSize: '16px',
      color: '#B3B3B3',
      paddingBottom: '5%',
    },
    '& .dzu-submitButtonContainer': {
      display: 'none',
    },
  },
  width: '100%',
  maxWidth: '500px',
  position: 'relative',
  background: '#fff',
  border: '1px dashed #A1ABB1',
  borderRadius: '3px',
  '& .dzu-inputLabel': {
    fontSize: '14px',
    fontWeight: 500,
    color: '#15191B',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '10px',
  },
  '& .dzu-previewContainer': {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    position: 'relative',
    borderBottom: 0,
    '& img': {
      width: '100%',
      height: '100%',
    },
    '& .dzu-previewStatusContainer': {
      top: '5px',
      position: 'absolute',
      left: '58%',
      background: 'rgba(34, 34, 34, 0.6)',
      borderRadius: '20px',
      '& .dzu-previewButton': {
        backgroundImage: `url(${Close})  !important`,
        padding: '5px',
        margin: 0,
      },
    },
    '& .dzu-previewImage': {
      maxHeight: '500px',
    },
  },
  '& .dzu-input': {
    position: 'absolute',
    top: '-999999px',
    opacity: 0,
    visibility: 'hidden',
  },
  '& .dzu-submitButtonContainer': {
    display: 'none',
  },
  '& .buttonDropzone': {
    position: 'absolute',
    bottom: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
}))

interface IDropzone {
  totalFile?: number
  className?: any
  handleSubmit?: any
  onDrop?: any
  fileLink?: string
  handleRemoveFile?: (event: any) => void
  getMaxPageCount?: (totalPage: number) => void
}

const Dropzone = ({ onDrop, fileLink, handleRemoveFile, getMaxPageCount }: IDropzone) => {
  const PdfImage = useMemo(() => {
    return {
      url: fileLink,
    }
  }, [fileLink])

  const handleSubmit = (files: any, allFiles: any) => {
    allFiles.forEach((f: any) => f.remove())
  }

  const handleChangeStatus = (file: any, allFiles: any) => {
    if (allFiles === 'done') {
      if (file.meta.type === 'application/pdf') {
        onDrop(file.file)
      }
    } else if (allFiles === 'removed') {
    }
  }
  const handleGetMaxPageCount = (data: any) => {
    getMaxPageCount && getMaxPageCount(data)
  }
  return (
    <StyledDropzoneWrapper className='dropzoneContainer'>
      {!fileLink && (
        <DropzoneSource
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          styles={{ dropzone: { height: 200, border: 0, paddingTop: 5 } }}
          submitButtonContent={null}
          maxFiles={1}
          accept='.pdf'
          multiple={false}
          inputContent={
            <>
              <SVG src={FileIcon} />
              <span>Click or drag file to this area to import Ebook</span>
            </>
          }
        />
      )}

      <Box position={'relative'}>
        {fileLink && (
          <Box
            onClick={handleRemoveFile}
            sx={{ position: 'absolute', right: '23%', zIndex: 1, top: '3%', cursor: 'pointer' }}
          >
            <SVG src={closeBG} />
          </Box>
        )}
        <div id={CAPTURE_THUMBNAIL_ID}>
          {fileLink && (
            <PDFViewer
              document={PdfImage}
              page={1}
              canvasCss={'previewPdf'}
              scale={0.5}
              hideZoom={true}
              hideNavbar={true}
              getMaxPageCount={handleGetMaxPageCount}
            />
          )}
        </div>
      </Box>
    </StyledDropzoneWrapper>
  )
}

export default Dropzone
