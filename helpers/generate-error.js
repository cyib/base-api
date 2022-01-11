module.exports = function(status = 500, message, url, UsuarioId) {

  message = message.replace(/\n/g, '').replace(/Validation error:/g, '').trim();

  let error = {
    status,
    message,
    url,
    UsuarioId
  }

  return error;
}
