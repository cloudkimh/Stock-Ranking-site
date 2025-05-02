'use strict';

const { getConstant } = require('../dynamic_import.cjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { TABLE_NAME } = await getConstant(); // Load all constants
        const tableName = TABLE_NAME?.tbl_stock_info || "tbl_stock_info";

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
          stk_cd: { type: Sequelize.STRING, unique: true, allowNull: false },
          stk_nm: { type: Sequelize.STRING, allowNull: true },
          setl_mm: { type: Sequelize.STRING, allowNull: true },
          fav: { type: Sequelize.BIGINT, allowNull: true },
          cap: { type: Sequelize.BIGINT, allowNull: true },
          flo_stk: { type: Sequelize.BIGINT, allowNull: true },
          crd_rt: { type: Sequelize.STRING, allowNull: true },
          oyr_hgst: { type: Sequelize.STRING, allowNull: true },
          oyr_lwst: { type: Sequelize.STRING, allowNull: true },
          mac: { type: Sequelize.BIGINT, allowNull: true },
          mac_wght: { type: Sequelize.STRING, allowNull: true },
          for_exh_rt: { type: Sequelize.STRING, allowNull: true },
          repl_pric: { type: Sequelize.STRING, allowNull: true },
          per: { type: Sequelize.STRING, allowNull: true },
          eps: { type: Sequelize.STRING, allowNull: true },
          roe: { type: Sequelize.STRING, allowNull: true },
          pbr: { type: Sequelize.STRING, allowNull: true },
          ev: { type: Sequelize.STRING, allowNull: true },
          bps: { type: Sequelize.STRING, allowNull: true },
          sale_amt: { type: Sequelize.BIGINT, allowNull: true },
          bus_pro: { type: Sequelize.STRING, allowNull: true },
          cup_nga: { type: Sequelize.STRING, allowNull: true },
          "250hgst": { type: Sequelize.STRING, allowNull: true },
          "250lwst": { type: Sequelize.STRING, allowNull: true },
          high_pric: { type: Sequelize.STRING, allowNull: true },
          open_pric: { type: Sequelize.STRING, allowNull: true },
          low_pric: { type: Sequelize.STRING, allowNull: true },
          upl_pric: { type: Sequelize.STRING, allowNull: true },
          lst_pric: { type: Sequelize.STRING, allowNull: true },
          base_pric: { type: Sequelize.STRING, allowNull: true },
          exp_cntr_pric: { type: Sequelize.STRING, allowNull: true },
          exp_cntr_qty: { type: Sequelize.BIGINT, allowNull: true },
          "250hgst_pric_dt": { type: Sequelize.STRING, allowNull: true },
          "250hgst_pric_pre_rt": { type: Sequelize.STRING, allowNull: true },
          "250lwst_pric_dt": { type: Sequelize.STRING, allowNull: true },
          "250lwst_pric_pre_rt": { type: Sequelize.STRING, allowNull: true },
          cur_prc: { type: Sequelize.STRING, allowNull: true },
          pre_sig: { type: Sequelize.STRING, allowNull: true },
          pred_pre: { type: Sequelize.STRING, allowNull: true },
          flu_rt: { type: Sequelize.STRING, allowNull: true },
          trde_qty: { type: Sequelize.BIGINT, allowNull: true },
          trde_pre: { type: Sequelize.STRING, allowNull: true },
          fav_unit: { type: Sequelize.STRING, allowNull: true },
          dstr_stk: { type: Sequelize.BIGINT, allowNull: true },
          dstr_rt: { type: Sequelize.STRING, allowNull: true },
          return_code: { type: Sequelize.INTEGER, allowNull: true },
          return_msg: { type: Sequelize.STRING, allowNull: true },
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
        const tableName = TABLE_NAME?.tbl_stock_info || "tbl_stock_info";

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.dropTable(tableName, {
                    transaction: t,
                }),
            ]);
        });
    },
};