const upload = (req, res) => {
    if (req.file.filename) {
        res.status(200).send({ "msg": "Image uploaded successfully", "url": req.file.filename })
    } else {
        res.status(500).send({ "msg": "Something went wrong while uploading file" })
    }
}

module.exports = {
    upload
}