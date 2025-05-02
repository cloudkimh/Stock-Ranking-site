'use strict';

const { getConstant } = require('../dynamic_import.cjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { TABLE_NAME } = await getConstant(); // Load all constants
        const tableName = TABLE_NAME?.tbl_stock_detail || "tbl_stock_detail";

        const modifications = async (columns) => {
            // Add new columns if they don't already exist
          
        };

        const fields = {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            dt: { type: Sequelize.STRING, allowNull: true },
            cur_prc: { type: Sequelize.STRING, allowNull: true },
            pre_sig: { type: Sequelize.STRING, allowNull: true },
            pred_pre: { type: Sequelize.STRING, allowNull: true },
            flu_rt: { type: Sequelize.STRING, allowNull: true },
            acc_trde_qty: { type: Sequelize.BIGINT, allowNull: true },
            acc_trde_prica: { type: Sequelize.BIGINT, allowNull: true },
            ind_invsr: { type: Sequelize.BIGINT, allowNull: true },
            frgnr_invsr: { type: Sequelize.BIGINT, allowNull: true },
            orgn: { type: Sequelize.BIGINT, allowNull: true },
            fnnc_invt: { type: Sequelize.BIGINT, allowNull: true },
            insrnc: { type: Sequelize.BIGINT, allowNull: true },
            invtrt: { type: Sequelize.STRING, allowNull: true },
            etc_fnnc: { type: Sequelize.BIGINT, allowNull: true },
            bank: { type: Sequelize.BIGINT, allowNull: true },
            penfnd_etc: { type: Sequelize.BIGINT, allowNull: true },
            samo_fund: { type: Sequelize.BIGINT, allowNull: true },
            natn: { type: Sequelize.BIGINT, allowNull: true },
            etc_corp: { type: Sequelize.BIGINT, allowNull: true },
            natfor: { type: Sequelize.BIGINT, allowNull: true },
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
        const tableName = TABLE_NAME?.tbl_stock_detail || "tbl_stock_detail";

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.dropTable(tableName, {
                    transaction: t,
                }),
            ]);
        });
    },
};