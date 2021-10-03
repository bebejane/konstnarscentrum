const withGraphql = require('next-plugin-graphql')

module.exports = withGraphql({
  target: 'server',
  sassOptions : {
    includePaths: ['./components', './pages'],
    /*prependData: `
      @import "./styles/variables.scss";
      @import "./styles/mq.scss";
    `*/
  }
})