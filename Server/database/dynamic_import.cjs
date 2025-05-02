const getConstant = async () => {
    const constant = await import('../constant/index.js');
    return constant;
};

const getEncryptCBC = async () => {
  const { encryptCBC } = await import('../global/encrypt_decrypt.handle.js');
  return encryptCBC;
};

module.exports = {
  getConstant,
  getEncryptCBC
};