/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect, ChangeEvent } from 'react'
import {
  InputAdornment,
  InputBase,
  Tooltip,
  Typography,
  alpha,
  useTheme
} from '@mui/material'
import { InfoOutlined, LinkRounded } from '@mui/icons-material'
import ReactPlayer from 'react-player'
import { Column, Stack, Alignment } from 'ruki-react-layouts'

export interface OnUploadParams {
  file: string
  blob: string
  link: string
}
export interface UploadDivProps {
  image: string
  viewOnly?: boolean
  video?: boolean
  sizeLimit?: number
  border?: string
  style?: React.CSSProperties
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  objectFitPosition?: string
  onUpload?: (file: OnUploadParams | File) => void
  placeholder?: React.ReactNode
  children?: React.ReactNode
  disableLink?: boolean
}

export const UploadDiv: React.FC<UploadDivProps> = (props) => {
  const theme = useTheme()
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>(props.image)
  const [backupImage] = useState<string>(props.image)
  const [error, setError] = useState<boolean>(false)
  const [isSizeLimit, setIsSizeLimit] = useState<boolean>(false)

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    if (!props.viewOnly && fileUploadRef.current) {
      fileUploadRef.current.click()
    }
  }

  useEffect(() => {
    setImage(
      props.image
        ? props.image !== ''
          ? props.image
          : backupImage
        : backupImage
    )
  }, [props.image])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = e.target.files?.[0]
    const fileReader = new FileReader()

    if (fileUploaded) {
      if (props.video && !fileUploaded.type.includes('video')) {
        console.log('err')
        setError(true)
      } else if (fileUploaded.size > (props.sizeLimit ?? 500000000)) {
        setIsSizeLimit(true)
        setError(true)
      } else if (!props.video && !fileUploaded.type.includes('image')) {
        setError(true)
      } else {
        fileReader.onload = function (e) {
          if (!e) return
          const dataUri = fileReader.result as string
          setImage(dataUri)
        }
        fileReader.readAsDataURL(fileUploaded)

        if (props.onUpload != null) props.onUpload(fileUploaded)
        setError(false)
      }
    }
  }

  return (
    <Column
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'pointer'
      }}
      alignment={Alignment.center}
    >
      <Stack>
        {props.video ? (
          <div
            className='video-wrapper'
            style={{
              ...props.style,
              border: !image
                ? props.border ?? `2px ${theme.palette.divider} dashed`
                : '',
              width: '100%',
              height: '100%'
            }}
            onClick={handleClick}
          >
            {!image ? (
              !props.viewOnly && (
                <Column
                  alignment={Alignment.center}
                  crossAlignment={Alignment.center}
                >
                  {props.placeholder ?? (
                    <Typography
                      variant='overline'
                      style={{
                        color: alpha(theme.palette.text.primary, 0.5)
                      }}
                    >
                      Upload Video File
                    </Typography>
                  )}
                </Column>
              )
            ) : (
              <ReactPlayer
                controls
                config={{ youtube: { playerVars: { showinfo: 1 } } }}
                width='100%'
                height='100%'
                url={image?.startsWith('blob:') ? image : image}
              />
            )}
          </div>
        ) : (
          <div
            style={{
              ...props.style,
              border: !image
                ? props.border ?? `2px ${theme.palette.divider} dashed`
                : '',
              height: '100%',
              width: '100%'
            }}
          >
            <Column
              alignment={Alignment.center}
              crossAlignment={Alignment.center}
              style={{ width: '100%', height: '100%' }}
              onClick={handleClick}
            >
              {image || image === '' ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <img
                    style={{
                      objectFit: props.objectFit ?? 'cover',
                      objectPosition: props.objectFitPosition ?? 'center center'
                    }}
                    width='100%'
                    height='100%'
                    src={image?.startsWith('blob:') ? image : image}
                    alt='Uploaded'
                  />
                </div>
              ) : props.image ? (
                <img
                  src={props.image}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: props.objectFit ?? 'cover'
                  }}
                  alt='Default'
                />
              ) : (
                !props.viewOnly && (
                  <Column
                    alignment={Alignment.center}
                    crossAlignment={Alignment.center}
                    style={{
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none'
                    }}
                  >
                    {props.placeholder ?? (
                      <Typography
                        variant='overline'
                        style={{
                          textAlign: 'center',
                          color: alpha(theme.palette.text.primary, 0.5)
                        }}
                      >
                        Upload Image File
                      </Typography>
                    )}
                  </Column>
                )
              )}
            </Column>
          </div>
        )}
        <Column
          alignment={Alignment.center}
          crossAlignment={Alignment.center}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          {!props.viewOnly && props.children}
        </Column>
        {!props.disableLink && (
          <Column
            style={{
              height: '100%',
              alignItems: 'end',
              pointerEvents: 'none'
            }}
            alignment={props.video ? Alignment.top : Alignment.bottom}
          >
            <Column
              style={{
                pointerEvents: 'all'
              }}
            >
              <InputBase
                value={/^(http(s)?:\/\/(.)+)/g.test(image) ? image : ''}
                startAdornment={
                  <InputAdornment position='start'>
                    <LinkRounded />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position='end'>
                    <Tooltip title='You must only paste valid links'>
                      <InfoOutlined />
                    </Tooltip>
                  </InputAdornment>
                }
                style={{
                  borderRadius: 20,
                  margin: 10,
                  padding: '5px 15px',
                  background: 'rgb(53,53,53)',
                  fontSize: 12,
                  pointerEvents: 'all'
                }}
                onChange={(e) => {
                  setImage(e.target.value)
                  if (
                    props.onUpload &&
                    /^(http(s)?:\/\/(.)+)/g.test(e.target.value)
                  ) {
                    props.onUpload({
                      file: e.target.value,
                      blob: e.target.value,
                      link: e.target.value
                    })
                  }
                }}
                inputProps={{
                  style: {
                    fontSize: 12
                  }
                }}
                placeholder={
                  props.video ? 'Paste Video Link' : 'Paste Image URL'
                }
              />
            </Column>
          </Column>
        )}
      </Stack>
      <input
        type='file'
        ref={fileUploadRef}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {error && (
        <Typography style={{ color: 'red', fontSize: '12px', margin: '10px' }}>
          {isSizeLimit
            ? `Please upload a ${props.video ? 'video' : 'image'} file ${
                props.sizeLimit
                  ? 'less than (' + props.sizeLimit * 1e-6 + 'mb)'
                  : '!'
              }`
            : `Please upload ${props.video ? 'a video' : 'an image'} file!`}
        </Typography>
      )}
    </Column>
  )
}
