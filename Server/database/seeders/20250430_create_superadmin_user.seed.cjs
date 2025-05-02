const { getConstant, getEncryptCBC } = require('../dynamic_import.cjs');
const email = 'superadmin@example.com';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { TABLE_NAME, ROLE } = await getConstant(); // Load all constants
		const tableName = TABLE_NAME?.tbl_users || "tbl_users";
    
    const encryptCBC = await getEncryptCBC();
    const passwordHash = await encryptCBC('admin@123'); // Replace with a secure password

    await queryInterface.bulkInsert(tableName, [
      {
        user_unique_id: 'SUPERADMIN',
        nick_name: 'SUPERADMIN',
        phone: '0000000000',
        email: email,
        password: passwordHash,
        invite_code: 'SUPERADMIN',
        role: ROLE.SUPERADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(TABLE_NAME?.tbl_users || 'tbl_users', {
      email: email,
    });
  },
};
