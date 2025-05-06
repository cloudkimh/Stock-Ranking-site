import { TABLE_NAME } from '../../constant/index.js';
import hooks from '../hooks/stockinfo.hooks.js';

export default (sequelize, DataTypes) => {

    const StockinfoModel = sequelize.define('StockinfoModel', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        stk_cd: { type: DataTypes.STRING, unique: true, allowNull: false },
        stk_nm: { type: DataTypes.STRING, allowNull: true },
        setl_mm: { type: DataTypes.STRING, allowNull: true },
        fav: { type: DataTypes.BIGINT, allowNull: true },
        cap: { type: DataTypes.BIGINT, allowNull: true },
        flo_stk: { type: DataTypes.BIGINT, allowNull: true },
        crd_rt: { type: DataTypes.STRING, allowNull: true },
        oyr_hgst: { type: DataTypes.STRING, allowNull: true },
        oyr_lwst: { type: DataTypes.STRING, allowNull: true },
        mac: { type: DataTypes.BIGINT, allowNull: true },
        mac_wght: { type: DataTypes.STRING, allowNull: true },
        for_exh_rt: { type: DataTypes.STRING, allowNull: true },
        repl_pric: { type: DataTypes.STRING, allowNull: true },
        per: { type: DataTypes.STRING, allowNull: true },
        eps: { type: DataTypes.STRING, allowNull: true },
        roe: { type: DataTypes.STRING, allowNull: true },
        pbr: { type: DataTypes.STRING, allowNull: true },
        ev: { type: DataTypes.STRING, allowNull: true },
        bps: { type: DataTypes.STRING, allowNull: true },
        sale_amt: { type: DataTypes.BIGINT, allowNull: true },
        bus_pro: { type: DataTypes.STRING, allowNull: true },
        cup_nga: { type: DataTypes.STRING, allowNull: true },
        "250hgst": { type: DataTypes.STRING, allowNull: true },
        "250lwst": { type: DataTypes.STRING, allowNull: true },
        high_pric: { type: DataTypes.STRING, allowNull: true },
        open_pric: { type: DataTypes.STRING, allowNull: true },
        low_pric: { type: DataTypes.STRING, allowNull: true },
        upl_pric: { type: DataTypes.STRING, allowNull: true },
        lst_pric: { type: DataTypes.STRING, allowNull: true },
        base_pric: { type: DataTypes.STRING, allowNull: true },
        exp_cntr_pric: { type: DataTypes.STRING, allowNull: true },
        exp_cntr_qty: { type: DataTypes.BIGINT, allowNull: true },
        "250hgst_pric_dt": { type: DataTypes.STRING, allowNull: true },
        "250hgst_pric_pre_rt": { type: DataTypes.STRING, allowNull: true },
        "250lwst_pric_dt": { type: DataTypes.STRING, allowNull: true },
        "250lwst_pric_pre_rt": { type: DataTypes.STRING, allowNull: true },
        cur_prc: { type: DataTypes.STRING, allowNull: true },
        pre_sig: { type: DataTypes.STRING, allowNull: true },
        pred_pre: { type: DataTypes.STRING, allowNull: true },
        flu_rt: { type: DataTypes.STRING, allowNull: true },
        trde_qty: { type: DataTypes.BIGINT, allowNull: true },
        trde_pre: { type: DataTypes.STRING, allowNull: true },
        fav_unit: { type: DataTypes.STRING, allowNull: true },
        dstr_stk: { type: DataTypes.BIGINT, allowNull: true },
        dstr_rt: { type: DataTypes.STRING, allowNull: true },
        return_code: { type: DataTypes.INTEGER, allowNull: true },
        return_msg: { type: DataTypes.STRING, allowNull: true },
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
        tableName: TABLE_NAME?.tbl_stock_info || 'tbl_stock_info',
        paranoid: true,
        hooks: hooks(sequelize),
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true, // optional
        indexes: [
            {
                fields: ['id'],
            },
            {
                fields: ['stk_cd'],
            }
        ]
    });

    StockinfoModel.associate = (models) => {
        StockinfoModel.belongsTo(models.StocklistModel, {
            foreignKey: 'stk_cd',
            targetKey: 'code',
            as: 'stock_list',
        });
    };

    return StockinfoModel;
};