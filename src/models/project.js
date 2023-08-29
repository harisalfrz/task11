'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    projectName: DataTypes.STRING,
    authorName: DataTypes.STRING,
    postedAt: DataTypes.DATE,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.STRING,
    inputNodejs: DataTypes.STRING,
    inputReactjs: DataTypes.STRING,
    inputVuejs: DataTypes.STRING,
    inputJavascript: DataTypes.STRING,
    inputImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'project',
    timestamps: true,
    createAt: true,
    updatedAt: 'updateTimestamp',
  });
  return project;
};