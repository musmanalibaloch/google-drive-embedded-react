import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import useDrivePicker from 'react-google-drive-picker'
// import MicrosoftLogin from "react-microsoft-login"
import DropboxChooser from 'react-dropbox-chooser'
import { ReactOneDriveFilePicker } from 'react-onedrive-filepicker'
const googleClientId = '403282322859-il4c2bjm51fv9jn7anrattb34f5i6a22.apps.googleusercontent.com'

function App() {
  const [embedLink, setEmbedLink] = useState('')
  const [dropboxLink, setDropboxLink] = useState('')
  const [openPicker, authResponse] = useDrivePicker()
  const [oneDriveLink, setOneDriveLink] = useState('')

  const history = useHistory()

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
        if (data.action === 'picked' && data.docs.length) {
          data.docs[0].serviceId === 'doc' ?
            setEmbedLink(data.docs[0].embedUrl.replace('preview', 'edit')) :
            setEmbedLink(data.docs[0].url)
        }
        setDropboxLink('')
        console.log(data, 'data')
      },
    })
  }

  const onDropboxSuccess = (files) => {
    setDropboxLink(files[0].link)
    setEmbedLink('')
    // '&cloud_editor=gsheet&rlkey=ee9bnhe14tdexxlva436xfknt#gid=317326336F21'
    console.log('files :>> ', files);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem('onedrive'))
        setOneDriveLink(JSON.parse(localStorage.getItem('onedrive'))?.value[0]?.permissions[0]?.link.webUrl)
    }, 1000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => handleGooglePicker()}>Google Drive</button>
      </div>
      <div>
        <br /><br />
        {
          embedLink &&
          <iframe title='google drive' frameBorder="0" src={embedLink} width='100%' height='600'></iframe>
        }

        <br />
        <DropboxChooser
          appKey={'k5znze35c87mq86'}
          success={files => onDropboxSuccess(files)}
          linkType="direct"
          multiselect={false}
          extensions={['.docx', '.xlsx']}
        >
          <button className="dropbox-button">Dropbox</button>
        </DropboxChooser>

        <br />
        <ReactOneDriveFilePicker
          clientID="ac25afff-1c48-4e39-8dea-773a98616655"
          action="share"
          multiSelect={false}
          openInNewWindow={false}
          onSuccess={(result) => { localStorage.setItem('onedrive', JSON.stringify(result)) && history.push('/') }}
          onCancel={(result) => localStorage.removeItem('onedrive')}
          advanced={{
            createLinkParameters: { type: 'embed', scope: 'anonymous' }
          }}
        >
          <button>Open One Drive</button>
        </ReactOneDriveFilePicker>

        <br /> <br />
        {
          oneDriveLink &&
          <iframe title='one drive' src={oneDriveLink} width='100%' height='600' frameBorder={0}></iframe>
        }

        {dropboxLink &&
          <iframe title='google drive' frameBorder="0" src={dropboxLink} width='100%' height='600'></iframe>
        }
      </div>
    </div>
  )
}

export default App