export default (sequelize) => {
   return {
      async beforeCreate(instance, options) {
         // let { BankModel } = sequelize.models;
         // import model ex. =>> sequelize.models
         // console.log("Creating Bank...");
      },

      async beforeUpdate(instance, options) {
         // console.log("Updating Bank...");
      },

      async afterCreate(instance, options) {
         // console.log("Bank created with ID:", instance.id);
      },

      async afterUpdate(instance, options) {
         // console.log("Bank updated with ID:", instance.id);
      }
   };
};