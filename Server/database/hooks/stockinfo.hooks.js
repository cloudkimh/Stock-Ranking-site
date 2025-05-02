import { Op, Sequelize } from 'sequelize';

export default {
    // Priority 1
    // async beforeBulkCreate(instances, options) {
        
    // },
    // async beforeBulkDestroy(options) {
        
    // },
    // async beforeBulkUpdate(options) {
        
    // },

    // Priority 4
    async beforeCreate(instance, options) {
        // console.log("Creating start...");
    },
    // async beforeDestroy(instance, options) {
        
    // },
    async beforeUpdate(instance, options) {
        // console.log("Updating start...");
    },
    // async beforeSave(instance, options) {
        
    // },
    // async beforeUpsert(values, options) {
        
    // },

    // Priority 5
    async afterCreate(instance, options) {
        // console.log("Created");
    },
    // async afterDestroy(instance, options) {
        
    // },
    async afterUpdate(instance, options) {
        // console.log("Updated");
    },
    // async afterSave(instance, options) {
        
    // },
    // async afterUpsert(created, options) {
        
    // },

    // Priority 6
    // async afterBulkCreate(instances, options) {
        
    // },
    // async afterBulkDestroy(options) {
        
    // },
    // async afterBulkUpdate(options) {
        
    // },
};
