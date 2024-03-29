import { useRef, useState } from 'react'
import { Button, InputGroup, Input, Spinner, Tooltip } from '@chakra-ui/react'
import { IoCamera } from 'react-icons/io5'
import { uploadImageToStorage } from '../database/storage'

/**
 * reacts conditionally if there is a downloadURL, it allows uploading images and checking erros
 * @param {props} props
 * @property {function} setError sets the error to parent component
 * @property {function} clearErrors clears the error to parent component
 */
export default function ImageUploader({ setError, clearErrors }) {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [downloadURL, setDownloadURL] = useState(null)
  const [copied, setCopied] = useState(false)

  // for replacing default styling and replacing it with chakra ui
  const handleClick = () => inputRef.current?.click()

  const uploadFile = async (e) => {
    setUploading(true)
    clearErrors('image')
    const file = e.target.files[0]
    if (!file) return

    // check fileMB
    const fileMB = file.size / (1024 * 1024)
    const MAX_FILE_SIZE = 5
    if (fileMB > MAX_FILE_SIZE) {
      setError('image', { message: 'Max file size is 5mb' })
    }

    uploadImageToStorage(file, setDownloadURL, setUploading)
  }

  return downloadURL ? (
    <InputGroup>
      {/* <Image
        src={downloadURL}
        maxW={{ base: '0px', md: '128px' }}
        maxH={'128px'}
        alt=""
      /> */}
      <Tooltip label="Only one Image is allowed per face" openDelay={500}>
        <Button
          width={'100%'}
          onClick={() => {
            navigator.clipboard.writeText(`![ Image Title ](${downloadURL})`)
            setCopied(true)
          }}
        >
          {copied ? 'copied!' : 'Get Image Link'}
        </Button>
      </Tooltip>
    </InputGroup>
  ) : (
    <InputGroup>
      <Input
        type={'file'}
        id="image"
        accept={'image/*'}
        hidden
        ref={inputRef}
        onChange={uploadFile}
      />

      <Button
        width={'100%'}
        overflow="hidden"
        isDisabled={uploading}
        onClick={handleClick}
        leftIcon={uploading ? <Spinner /> : <IoCamera size={'32px'} />}
      >
        Upload
      </Button>
    </InputGroup>
  )
}
