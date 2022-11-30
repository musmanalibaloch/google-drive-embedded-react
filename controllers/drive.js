const getDriveFiles = async (req, res, next) => {
  try {
    const { tokenId } = req.query

    const resp = await fetch('https://www.googleapis.com/drive/v3/files?key=403282322859-il4c2bjm51fv9jn7anrattb34f5i6a22.apps.googleusercontent.com', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + tokenId
      }
    })

    const data = await resp.json()

    res.status(200).json({ status: true, data: data })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getDriveFiles
}