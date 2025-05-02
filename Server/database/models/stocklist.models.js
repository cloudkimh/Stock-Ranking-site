import { TABLE_NAME } from '../../constant/index.js';
import hooks from '../hooks/stocklist.hooks.js';

export default (sequelize, DataTypes) => {

    const StocklistModel = sequelize.define('StocklistModel', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        listCount: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        auditInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        regDay: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastPrice: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        marketCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        marketName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        upName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        upSizeName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyClassName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        orderWarning: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nxtEnable: {
            type: DataTypes.STRING,
            allowNull: true,
        },
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
        tableName: TABLE_NAME?.tbl_stock_list || 'tbl_stock_list',
        paranoid: true,
        hooks,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: false, // optional
    });

    StocklistModel.associate = (models) => {
        StocklistModel.hasOne(models.StockinfoModel, {
            foreignKey: 'stk_cd',
            sourceKey: 'code',
            as: 'stock_info',
        });

        StocklistModel.hasOne(models.StockdetailModel, {
            foreignKey: 'stk_cd',
            sourceKey: 'code',
            as: 'stock_detail',
        });
    };

    return StocklistModel;
}