'use strict';

const { getConstant } = require('../dynamic_import.cjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { TABLE_NAME } = await getConstant(); // Load all constants
        const tableName = TABLE_NAME?.tbl_stock_list || "tbl_stock_list";

        const modifications = async (columns) => {
            // Add new columns if they don't already exist
            
        };

        const fields = {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            listCount: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },
            auditInfo: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            regDay: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            lastPrice: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            marketCode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            marketName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            upName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            upSizeName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            companyClassName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            orderWarning: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            nxtEnable: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        };

        await queryInterface
            .describeTable(tableName)
            .then(modifications)
            .catch(async () => {
                await queryInterface.createTable(tableName, fields);
                // PostgreSQL: reset sequence to start from 1000000
                await queryInterface.sequelize.query(
                    `ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH 1000000001`
                );
                const dfns = await queryInterface.describeTable(tableName);
                await modifications(dfns);
            });
    },

    down: async (queryInterface, Sequelize) => {
        const { TABLE_NAME } = await getConstant(); // Load all constants
        const tableName = TABLE_NAME?.tbl_stock_list || "tbl_stock_list";

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.dropTable(tableName, {
                    transaction: t,
                }),
            ]);
        });
    },
};