const layout = require('../layout.js')
const { getError } = require('../../helpers.js')

module.exports = ({ errors }) => {
  return layout({
    content: `
      <form method="POST" ectype="multipart/form-data">
        <input placeholder="Title" name="title"/>
        ${getError('title')}
        <input placeholder="Price" name="price"/>
        ${getError('price')}
        <input type="file" name="image"/>
        <button>Submit</button>
      </form>
    `,
  })
}
