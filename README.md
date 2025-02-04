# react-upload-box

> Upload a media file or paste a media link this media uploader will allow you to retrieve uploaded data from your users very easily

[![NPM](https://img.shields.io/npm/v/react-upload-box.svg)](https://www.npmjs.com/package/react-upload-box) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-upload-box
```

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from 'react-upload-box'
import 'react-upload-box/dist/index.css'

const Home = () => {
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const _upload = () => {

    }
    return <>
        <Appbar pageNumber={1}>
            <Grid container  spacing={2} sx={{ flexGrow: 1 }}>
               <Card style={{height: 200, width: 200}}>
                <UploadBox onUpload={(file)=>{
                    setUploadImage(file);
                }} image=""/>
               </Card>
               <Grid sx={{xs: 12}}>
                <Button variant="contained" color="primary" onClick={_upload}>Upload</Button>
                </Grid>
            </Grid>
        </Appbar>
    </>
};
```

## License

MIT © [Ruki](https://github.com/Ruki)
