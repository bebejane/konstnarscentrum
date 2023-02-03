function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `Det uppstode ett fel på servern: ${statusCode}`
        : `Det uppstode ett fel på klienten`
      }
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error