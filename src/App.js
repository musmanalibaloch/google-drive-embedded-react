import { useEffect, useState } from 'react'
import useDrivePicker from 'react-google-drive-picker'
import DropboxChooser from 'react-dropbox-chooser'
const googleClientId = '403282322859-il4c2bjm51fv9jn7anrattb34f5i6a22.apps.googleusercontent.com'

function App() {
  const [embedLink, setEmbedLink] = useState('')
  const [openPicker, authResponse] = useDrivePicker()

  const handleGooglePicker = () => {
    openPicker({
      clientId: googleClientId,
      developerKey: "AIzaSyCL97iSv8liU2vpa2qdT_K71D5oHkCC5co",
      viewId: "DOCS",
      token: authResponse?.access_token,
      showUploadView: false,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }

        if (data.action === 'picked' && data.docs.length) {
          data.docs[0].serviceId === 'doc' ?
            setEmbedLink(data.docs[0].embedUrl.replace('preview', 'edit')) :
            setEmbedLink(data.docs[0].url)
          console.log('User clicked cancel/close button')
        }
        console.log(data, 'data')
      },
    })
  }

  const onDropboxSuccess = (files) => {
    setEmbedLink(files.link)
    // '&cloud_editor=gsheet&rlkey=ee9bnhe14tdexxlva436xfknt#gid=317326336F21'
    console.log('files :>> ', files);
  }

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => handleGooglePicker()}>Google Drive</button>
      </div>
      <div>
        <br /><br />
        {/* {
          embedLink &&
          <iframe title='google drive' frameBorder="0" src={embedLink} width='100%' height='600'></iframe>
        } */}

        <br />
        <DropboxChooser
          appKey={'k5znze35c87mq86'}
          success={files => onDropboxSuccess(files)}
          // cancel={() => onCancel()}
          linkType='direct'
          multiselect={true}
        >
          <button className="dropbox-button">Dropbox</button>
        </DropboxChooser>

        <br />
        {/* <ReactOneDriveFilePicker
          clientID="1d76d80a-6cea-4dcd-9b59-00909ec1c49e"
          action="query"
          multiSelect={false}
          onSuccess={(result) => alert(JSON.stringify(result))}
          onCancel={(result) => alert(JSON.stringify(result))}
        >
          <button>Open One Drive</button>
        </ReactOneDriveFilePicker> */}

        {/* <iframe title='google drive' frameBorder="0" src="https://www.dropbox.com/s/hvdseqx6aiy08xo/file_example_XLS_10.xlsx?dl=0" width='100%' height='600'></iframe> */}
      </div>
    </div>
  )
}

export default App
