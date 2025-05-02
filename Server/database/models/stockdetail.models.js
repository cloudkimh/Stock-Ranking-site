import { TABLE_NAME } from '../../constant/index.js';
import hooks from '../hooks/stockdetail.hooks.js';

export default (sequelize, DataTypes) => {

    const StockdetailModel = sequelize.define('StockdetailModel', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        dt: { type: DataTypes.STRING, allowNull: true },
        cur_prc: { type: DataTypes.STRING, allowNull: true },
        pre_sig: { type: DataTypes.STRING, allowNull: true },
        pred_pre: { type: DataTypes.STRING, allowNull: true },
        flu_rt: { type: DataTypes.STRING, allowNull: true },
        acc_trde_qty: { type: DataTypes.BIGINT, allowNull: true },
        acc_trde_prica: { type: DataTypes.BIGINT, allowNull: true },
        ind_invsr: { type: DataTypes.BIGINT, allowNull: true },
        frgnr_invsr: { type: DataTypes.BIGINT, allowNull: true },
        orgn: { type: DataTypes.BIGINT, allowNull: true },
        fnnc_invt: { type: DataTypes.BIGINT, allowNull: true },
        insrnc: { type: DataTypes.BIGINT, allowNull: true },
        invtrt: { type: DataTypes.STRING, allowNull: true },
        etc_fnnc: { type: DataTypes.BIGINT, allowNull: true },
        bank: { type: DataTypes.BIGINT, allowNull: true },
        penfnd_etc: { type: DataTypes.BIGINT, allowNull: true },
        samo_fund: { type: DataTypes.BIGINT, allowNull: true },
        natn: { type: DataTypes.BIGINT, allowNull: true },
        etc_corp: { type: DataTypes.BIGINT, allowNull: true },
        natfor: { type: DataTypes.BIGINT, allowNull: true },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: TABLE_NAME?.tbl_stock_detail || 'tbl_stock_detail',
        paranoid: true,
        hooks,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true, // optional
    });

    return StockdetailModel;
};