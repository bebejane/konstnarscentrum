import mjml2html from 'mjml'

const resetPassword = ({button, href, message}) => mjml2html(`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text align="center">
            ${message}
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-button href="${href}" font-family="Helvetica" background-color="#f45e43" color="white">
            ${button}
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`, {}).html

export default resetPassword;