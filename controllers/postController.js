// CREATE PRODUCT
const index = async(req, res) => {
    const posts = [{ 'author': 'Kaddu Livingston', 'description': 'Awesome computer science designs' }]
    res.send(posts)
}

module.exports = {
    index
}