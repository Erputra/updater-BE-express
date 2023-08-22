
function setupAssociations() {
  const RegisterLicences = require('./RegisterLicences');
  const RegisterLicencesDetails = require('./RegisterLicencesDetails');
  
  console.log(RegisterLicences);
  RegisterLicences.hasMany(RegisterLicencesDetails, {
    foreignKey: 'registerLicencesId',
    as: 'details',
  });

  RegisterLicencesDetails.belongsTo(RegisterLicences, {
    foreignKey: 'registerLicencesId',
    as: 'registerLicences',
  });
}

module.exports = setupAssociations;
